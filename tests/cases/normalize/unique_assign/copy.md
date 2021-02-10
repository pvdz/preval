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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
