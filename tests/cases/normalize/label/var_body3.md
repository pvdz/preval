# Preval test case

# var_body3.md

> Normalize > Label > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
test: var x;
$(x);
`````

## Normalized

`````js filename=intro
var x;
$(x);
`````

## Output

`````js filename=intro
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
