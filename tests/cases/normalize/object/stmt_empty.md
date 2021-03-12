# Preval test case

# stmt_empty.md

> Normalize > Object > Stmt empty
>
> Objects as statement should be eliminated

#TODO

## Input

`````js filename=intro
({});
`````

## Pre Normal

`````js filename=intro
({});
`````

## Normalized

`````js filename=intro

`````

## Output

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
