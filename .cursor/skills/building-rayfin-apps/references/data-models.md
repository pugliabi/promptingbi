# Rayfin Data Models Reference

Entities are TypeScript classes decorated with `@entity()` in `rayfin/data/`. Rayfin compiles them into database tables, GraphQL endpoints, and type-safe client methods.

## Basic Entity

```typescript
import { entity, uuid, text, date } from '@microsoft/rayfin-core';

@entity()
export class Todo {
  @uuid() id!: string;
  @text() title!: string;
  @text({ optional: true }) description?: string;
  @date() createdAt!: Date;
  @date() updatedAt!: Date;
}
```

## Primary Keys

- Every entity uses a UUID `string` field named `id`. If you omit it, Rayfin adds it automatically.
- `id` is optional on create — server generates a UUID if omitted; client-supplied UUIDs allowed.
- **Not supported:** composite primary keys, custom key names.

## Field Decorators

| Decorator    | TS Type | Notes                                            |
| ------------ | ------- | ------------------------------------------------ |
| `@uuid()`    | string  | Unique identifier                                |
| `@text()`    | string  | Optional length constraints via min/max          |
| `@int()`     | number  | Integer                                          |
| `@decimal()` | number  | Decimal/numeric                                  |
| `@boolean()` | boolean | True/false                                       |
| `@date()`    | Date    | Serializes from ISO strings or Date objects      |
| `@email()`   | string  | Text with email validation                       |
| `@set()`     | string  | Enumerated string literals: `@set('a','b','c')`  |

## Modifiers

| Modifier             | Effect                                          |
| -------------------- | ----------------------------------------------- |
| `{ optional: true }` | Allow NULL (fields are required by default)     |
| `{ unique: true }`   | Unique constraint                               |
| `{ default: value }` | Default value expression                        |
| `{ min: n, max: n }` | String length OR numeric value constraints      |

**Gotcha:** TypeScript's `?` only affects the static type — it does NOT make the column nullable. Use `{ optional: true }`. Use `!` to assert framework-initialized required fields.

```typescript
@entity()
export class User {
  @uuid() id!: string;
  @email({ unique: true }) email!: string;
  @text({ min: 3, max: 50 }) username!: string;
  @text({ optional: true, max: 500 }) bio?: string;
  @int({ min: 0, max: 150 }) age!: number;
  @boolean({ default: false }) isVerified!: boolean;
  @set('draft', 'published', 'archived') status!: 'draft' | 'published' | 'archived';
}
```

## Relationships

- **One-to-many:** `@many(() => Child)` on parent, `@one(() => Parent)` on child.
- Rayfin auto-generates FK columns from navigation decorators. Declare the FK field explicitly only if you read/write it in code.
- FK naming convention is `{property}_id` — custom names (`foreignKey`, `targetKey`) NOT supported.
- **Many-to-many NOT supported** — model an explicit join entity.

```typescript
import { entity, uuid, text, date, one, many } from '@microsoft/rayfin-core';

@entity()
export class Notebook {
  @uuid() id!: string;
  @text() name!: string;
  @many(() => Note) notes?: Note[];
}

@entity()
export class Note {
  @uuid() id!: string;
  @text() title!: string;
  @text() notebook_id!: string;          // FK field (explicit because we set it in code)
  @one(() => Notebook) notebook?: Notebook;
}
```

## System Entities / Per-User Rows

`@one()` to system entities (e.g. built-in USER) is NOT supported. Store the user id as plain text from auth claims:

```typescript
@entity()
export class Task {
  @uuid() id!: string;
  @text() title!: string;
  @text() user_id!: string;  // populate from claims.sub; filter in @role policies
}
```

## Schema Registration (mandatory)

Every entity must be registered in `rayfin/data/schema.ts`, or it won't appear in the API or client:

```typescript
import type { Note } from './Note.js';
import type { Notebook } from './Notebook.js';

export type NotesAppSchema = {
  Note: Note;
  Notebook: Notebook;
};
```

The client SDK uses this map for type-safe access via `client.data.<Entity>`.

## Applying Schema Changes

```bash
npx rayfin up db apply           # deploy schema changes only
npx rayfin up db apply --force   # override destructive-change refusal (CAN LOSE DATA)
```

Destructive ops (drop column, retype column, rename table) are refused without `--force`. Review the listed operations before forcing.

## Best Practices

- Relative imports with `.js` extensions in entity files (emitted ESM must resolve).
- Don't declare FK fields you never touch in code — let Rayfin generate them.
- If a relationship is missing from the API: check the navigation decorator exists AND the entity is registered in schema.ts.
- Never modify schema in the Fabric portal's SQL editor — code is the single source of truth.
