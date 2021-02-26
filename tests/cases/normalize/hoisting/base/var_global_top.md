# Preval test case

# var_global_top.md

> Normalize > Hoisting > Base > Var global top
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
$(x);
var x = 10;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
$(x);
x = 10;
$(x);
`````

## Output

`````js filename=intro
$(undefined);
$(10);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
