# Preval test case

# ident_ident_bin.md

> normalize > assignment > let > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
let wat = a = b = c + d;
$(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpNestedComplexRhs = c + d;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let wat = a;
$(wat);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
tmpNestedComplexRhs = 7;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let wat = a;
$(wat);
$(a, b, 7);
`````
