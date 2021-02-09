# Preval test case

# ident_to_itself.md

> normalize > assign > ident_to_itself
>
> An ident that assigns to itself should be considered a noop

Since we don't consider idents to have observable side effects, this should be a noop.

Not very likely to happen in the wild, though it may be an artifact after some normalization / reduction.

#TODO

## Input

`````js filename=intro
let a = $(10);
a = a;
$(a);
`````

## Normalized

`````js filename=intro
let a = $(10);
a;
$(a);
`````

## Output

`````js filename=intro
let a = $(10);
$(a);
`````

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
