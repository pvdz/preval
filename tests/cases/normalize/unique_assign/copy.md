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

## Output

`````js filename=intro
let a = $(1);
a = $(2);
$(a);
`````

## Result

Should call `$` with:
[[1], [2], [null], null];

Normalized calls: Same

Final output calls: Same
