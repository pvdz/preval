# Preval test case

# stmt_cmp_props_simple.md

> Normalize > Object > Stmt cmp props simple
>
> Objects as statement should be eliminated

#TODO

## Input

`````js filename=intro
({['x']: 1, y: 2});
`````

## Pre Normal

`````js filename=intro
({ ['x']: 1, y: 2 });
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
