# Preval test case

# ident_ident_simple.md

> normalize > assignment > let > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let wat = a = b = c;
$(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
b = c;
a = c;
let wat = a;
$(wat);
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
b = 3;
a = 3;
let wat = a;
$(wat);
$(a, b, 3);
`````

## Result

Should call `$` with:
[[3], [3, 3, 3], null];

Normalized calls: Same

Final output calls: Same
