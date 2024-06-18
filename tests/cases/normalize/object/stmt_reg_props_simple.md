# Preval test case

# stmt_reg_props_simple.md

> Normalize > Object > Stmt reg props simple
>
> Objects as statement should be eliminated

## Input

`````js filename=intro
({x: 1, y: 2});
`````

## Pre Normal


`````js filename=intro
({ x: 1, y: 2 });
`````

## Normalized


`````js filename=intro

`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
