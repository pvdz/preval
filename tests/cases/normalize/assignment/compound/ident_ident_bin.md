# Preval test case

# ident_ident_bin.md

> normalize > assignment > stmt > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
a *= b += c + d;
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
b = b + tmpNestedComplexRhs;
a = a * tmpNestedComplexRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
tmpNestedComplexRhs = 7;
b = b + tmpNestedComplexRhs;
a = a * tmpNestedComplexRhs;
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: 9,9,3
 - 1: undefined

Normalized calls: BAD?!
[[7, 9, 3], null];

Final output calls: BAD!!
[[7, 9, 7], null];
