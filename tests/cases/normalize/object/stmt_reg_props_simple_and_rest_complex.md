# Preval test case

# stmt_reg_props_simple_and_rest_complex.md

> Normalize > Object > Stmt reg props simple and rest complex
>
> Objects as statement should be eliminated

#TODO

## Input

`````js filename=intro
({x: 1, y: 2, ...{a: $(10)}});
`````

## Pre Normal

`````js filename=intro
({ x: 1, y: 2, ...{ a: $(10) } });
`````

## Normalized

`````js filename=intro
$(10);
`````

## Output

`````js filename=intro
$(10);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
