# Rayfin Permissions Reference (@role)

`@role` attaches authorization rules directly to entities. Policies are type-safe TypeScript callbacks compiled into data-access policy expressions, enforced on every API request.

## Signature

```typescript
@role(roleName, actions, options?)
```

| Parameter  | Type               | Values                                                          |
| ---------- | ------------------ | --------------------------------------------------------------- |
| `roleName` | string             | `'authenticated'` (built-in) or a custom application role       |
| `actions`  | string \| string[] | `'create'`, `'read'`, `'update'`, `'delete'`, or `'*'`          |
| `options`  | object             | `{ policy, include, exclude }`                                  |

Built-in role: `authenticated` — requires a valid Fabric-authenticated session.

## Policy Expressions

```typescript
policy: (claims, item) => claims.sub.eq(item.userId)
```

Claims available: `claims.sub` (user ID), `claims.email`, `claims.role` (if provided by IdP).
Operators: `.eq()` for equality; chain with `.and()` / `.or()` (auto-parenthesized).

```typescript
// Owner AND active
policy: (claims, item) => claims.sub.eq(item.userId).and(item.isActive.eq(true))

// Admin OR owner
policy: (claims, item) => claims.role.eq('admin').or(claims.sub.eq(item.ownerId))
```

## Field-Level Permissions

`include` (allowlist) or `exclude` (denylist) field arrays — typed to actual entity property names, so renames produce compile errors in every list referencing them.

```typescript
@role('authenticated', 'create', {
  policy: (claims, item) => claims.sub.eq(item.createdBy),
  include: ['title'],                    // only title settable at create
})

@role('authenticated', 'read', {
  exclude: ['lastLogin', 'passwordHash'], // hidden from reads
})
```

## Action-Specific Rules (stack multiple decorators)

```typescript
@entity()
@role('authenticated', 'create', {
  policy: (claims, item) => claims.sub.eq(item.createdBy),
  include: ['title', 'content'],
})
@role('authenticated', 'read',   { policy: (c, i) => c.sub.eq(i.createdBy) })
@role('authenticated', 'update', { policy: (c, i) => c.sub.eq(i.createdBy), exclude: ['adminNotes'] })
@role('authenticated', 'delete', { policy: (c, i) => c.sub.eq(i.createdBy) })
export class SecureDocument {
  @uuid() id!: string;
  @text() title!: string;
  @text({ optional: true }) content?: string;
  @text({ optional: true }) adminNotes?: string;
  @text() createdBy!: string;
}
```

Multiple `@role` decorators aggregate per role; the CLI warns on conflicting declarations.

## Canonical Patterns

**Owner-only (default for client apps):**
```typescript
@role('authenticated', '*', { policy: (claims, item) => claims.sub.eq(item.ownerId) })
```

**Full access for any signed-in user (shared/team data):**
```typescript
@role('authenticated', '*')
```

**Admin override + admin-only delete:**
```typescript
@role('authenticated', ['create', 'read', 'update'], {
  policy: (claims, item) => claims.role.eq('admin').or(claims.sub.eq(item.ownerId))
})
@role('authenticated', 'delete', { policy: (claims, _item) => claims.role.eq('admin') })
```

## How It Compiles

1. `@role` collects metadata at class definition.
2. `npx rayfin up db apply` reads metadata, generates permission configuration.
3. Policy callbacks compile to expressions like `@claims.sub eq @item.userId`.
4. The data access layer enforces on every request.

## Consulting Notes

- Production auth is Fabric SSO (Entra ID) ONLY. Email/password is local-dev only. If the client needs external/anonymous users, Rayfin is the wrong tool — say so.
- For per-user write-back deliverables, the standard combo is a `user_id @text()` field populated from `claims.sub` + owner-only `@role` policy. This is Rayfin's RLS equivalent and pairs conceptually with semantic-model RLS the client already knows.
- App access also requires the Fabric item permission "Run and interact" — `@role` governs rows/fields, item permission governs whether the app opens at all. Both layers matter in handoff docs.
