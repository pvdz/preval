# Preval test case

# ident_simple.md

> normalize > assignment > stmt > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
a *= b;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
a = a * b;
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
a = a * 2;
$(a, 2, 3);
`````
