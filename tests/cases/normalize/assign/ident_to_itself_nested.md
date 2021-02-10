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
let x = $(20);
x = a = a;
$(a, x);
`````

## Normalized

`````js filename=intro
let a = $(10);
let x = $(20);
x = a;
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 10, 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
