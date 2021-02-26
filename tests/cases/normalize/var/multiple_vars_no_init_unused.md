# Preval test case

# multiple_vars_no_init_unused.md

> Normalize > Var > Multiple vars no init unused
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

#TODO

## Input

`````js filename=intro
var a, b, c
`````

## Normalized

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
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
