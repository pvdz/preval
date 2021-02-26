# Preval test case

# var_body.md

> Normalize > Label > Var body
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
test: var x = 0;
`````

## Normalized

`````js filename=intro
let x = undefined;
x = 0;
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
