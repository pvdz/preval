# Preval test case

# multiple_var_no_init.md

> normalize > var > multiple_var_no_init
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

#TODO

## Input

`````js filename=intro
var a, b, c
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
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
