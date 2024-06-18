# Preval test case

# stmt_reg_props_simple_and_rest.md

> Normalize > Object > Stmt reg props simple and rest
>
> Objects as statement should be eliminated

## Input

`````js filename=intro
({x: 1, y: 2, ...{a: 10}});
`````

## Pre Normal


`````js filename=intro
({ x: 1, y: 2, ...{ a: 10 } });
`````

## Normalized


`````js filename=intro
const tmpObjSpreadArg = { a: 10 };
({ ...tmpObjSpreadArg });
`````

## Output


`````js filename=intro
const tmpObjSpreadArg = { a: 10 };
({ ...tmpObjSpreadArg });
`````

## PST Output

With rename=true

`````js filename=intro
const a = { a: 10 };
{ ... a };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
