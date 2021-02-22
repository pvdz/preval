# Preval test case

# var_body2.md

> Normalize > Label > Var body2
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
test: var x = 0;
$(x);
`````

## Normalized

`````js filename=intro
var x;
x = 0;
$(x);
`````

## Output

`````js filename=intro
$(0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
