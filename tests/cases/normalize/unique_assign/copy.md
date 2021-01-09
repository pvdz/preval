# Preval test case

# copy.md

> normalize > unique_assign > copy
>
> The normalization step should make it so that each binding is only assigned to once. It should create fresh bindings for every mutation.

#TODO

## Input

`````js filename=intro
let a = $(1);
a = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = $(1);
a = $(2);
$(a);
`````

## Uniformed

`````js filename=intro
var x = x(8);
x = x(8);
x(x);
`````

## Output

`````js filename=intro
let a = $(1);
a = $(2);
$(a);
`````
