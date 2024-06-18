# Preval test case

# stmt_empty.md

> Normalize > Array > Stmt empty
>
> Array statements should be eliminated

## Input

`````js filename=intro
[];
`````

## Pre Normal


`````js filename=intro
[];
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
