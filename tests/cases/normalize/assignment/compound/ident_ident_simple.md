# Preval test case

# ident_ident_simple.md

> normalize > assignment > stmt > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
a *= b += c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
b = b + c;
a = a * c;
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
b = b + 3;
a = a * 3;
$(a, b, 3);
`````

## Result

Should call `$` with:
[[5, 5, 3], null];

Normalized calls: BAD?!
[[3, 5, 3], null];

Final output calls: BAD!!
[[3, 5, 3], null];

