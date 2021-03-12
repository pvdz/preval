# Preval test case

# multiple_var_init.md

> Normalize > Var > Multiple var init
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

#TODO

## Input

`````js filename=intro
var a = $(1), b = $(2), c = $(3);
`````

## Pre Normal

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
(a = $(1)), (b = $(2)), (c = $(3));
`````

## Normalized

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = $(1);
b = $(2);
c = $(3);
`````

## Output

`````js filename=intro
$(1);
$(2);
$(3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
