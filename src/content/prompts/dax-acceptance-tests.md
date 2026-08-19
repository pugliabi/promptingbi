---
title: "DAX Acceptance Tests for an MCP Modeling Session"
description: "The EVALUATE queries an agent runs before it reports model work as done, plus the smart anchor pattern and how a documented deviation should read."
category: dax
date: 2026-08-05T09:00:00Z
format: dax
source:
  permalink: "2026/08/05/inside-an-mcp-execution-session"
---

A chat can write DAX. An MCP session can prove it. The difference is whether the instructions page tells the agent which queries decide if the work counts as done, so this block sits near the bottom of every modeling brief I write.

## Validate before you report

```markdown
## Validate Before You Report
Run these through dax_query_operations after building:

-- Row counts against the verified model state
EVALUATE ROW ( "Games", COUNTROWS ( DimGame ),
               "TicketRows", COUNTROWS ( FactTicketSales ) )

-- Orphaned keys
EVALUATE FILTER ( FactTicketSales,
    NOT ( FactTicketSales[GameKey] IN VALUES ( DimGame[GameKey] ) ) )

-- Spot check: revenue by game matches AXS source totals
EVALUATE SUMMARIZECOLUMNS ( DimGame[GameKey],
    "Revenue", [This Game Revenue] )

-- New measures return sane numbers with no filter context
EVALUATE ROW ( "ThisGame", [This Game Revenue],
               "Trailing5Attend", [Trailing 5 Game Avg Attendance] )
```

Four checks, and each one answers a different question: do the row counts still match what I wrote down, did anything land without a parent, does the revenue agree with the source system, and do the new measures return a believable number with nothing filtered.

## The smart anchor pattern

Every game-window measure uses this, and the business reason lives directly underneath it so the agent knows why, not just what.

```dax
VAR _LatestGame =
    IF ( ISFILTERED ( DimDate[Date] ),
        MAX ( DimDate[Date] ),
        CALCULATE ( MAX ( FactTicketSales[GameDate] ), REMOVEFILTERS () ) )

-- Dashboards must show current data on load with no slicer selected;
-- if a user applies a date or game filter, respect it.
```

## What a documented deviation looks like

The autonomy directive says patterns are starting points, and deviations get documented in comments. This measure is that directive working: the brief sketched a `DATEADD` pattern over `DimDate`, the agent noticed it breaks on doubleheaders, and it walked the game sequence instead.

```dax
Game over Game Revenue % =
-- Deviation from instructions: DATEADD over DimDate double-counts
-- doubleheaders (two games, one date). Walking DimGame[GameNumber]
-- instead so every game compares to the actual prior game.
VAR CurrentGame = MAX ( DimGame[GameNumber] )
VAR PriorRevenue =
    CALCULATE (
        [This Game Revenue],
        DimGame[GameNumber] = CurrentGame - 1,
        REMOVEFILTERS ( DimGame )
    )
RETURN
    DIVIDE ( [This Game Revenue] - PriorRevenue, PriorRevenue )
```

I didn't write that measure. I read the comment, understood the reasoning in ten seconds, and moved on. That's the review posture to design for.

## Adapting it

- **Validate expressions before executing them.** The MCP can check DAX syntax without running it, so garbage never touches the model.
- **Wrap bulk changes in a transaction** so a bad batch rolls back instead of leaving the model half-modified.
- **Compare row counts against a number you wrote down beforehand.** An acceptance test is only as good as the reference point behind it.

The brief this belongs in, walked through section by section: [Inside an MCP Execution Session](/2026/08/05/inside-an-mcp-execution-session/).
