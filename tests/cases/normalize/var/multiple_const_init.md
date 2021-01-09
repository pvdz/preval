# Preval test case

# multiple_const_init.md

> normalize > var > multiple_const_init
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

#TODO

## Input

`````js filename=intro
const a = $(1), b = $(2), c = $(3);
`````

## Normalized

`````js filename=intro
const a = $(1);
const b = $(2);
const c = $(3);
`````

## Uniformed

`````js filename=intro
var x = x(8);
var x = x(8);
var x = x(8);
`````

## Output

`````js filename=intro
$(1);
$(2);
$(3);
`````
