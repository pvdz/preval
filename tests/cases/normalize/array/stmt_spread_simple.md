# Preval test case

# stmt_spread_simple.md

> Normalize > Array > Stmt spread simple
>
> Array statements should be eliminated

#TODO

## Input

`````js filename=intro
[...[10, 20], 2, ...[30, 40]];
`````

## Pre Normal

`````js filename=intro
[...[10, 20], 2, ...[30, 40]];
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
