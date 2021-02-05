# Preval test case

# multiple_var_init.md

> normalize > var > multiple_var_init
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

#TODO

## Input

`````js filename=intro
var a = $(1), b = $(2), c = $(3);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
a = $(1);
b = $(2);
c = $(3);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
a = $(1);
b = $(2);
c = $(3);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
