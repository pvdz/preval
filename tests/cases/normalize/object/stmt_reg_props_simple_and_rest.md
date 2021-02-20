# Preval test case

# stmt_reg_props_simple_and_rest.md

> Normalize > Object > Stmt reg props simple and rest
>
> Objects as statement should be eliminated

#TODO

## Input

`````js filename=intro
({x: 1, y: 2, ...{a: 10}});
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

Normalized calls: Same

Final output calls: Same
