# Preval test case

# ident_ident_bin.md

> normalize > assignment > binary-both > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$((a = b = c + d) + (a = b = c + d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedComplexRhs_2;
var tmpNestedComplexRhs_3;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpNestedComplexRhs_1 = c + d;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedComplexRhs_3 = c + d;
b = tmpNestedComplexRhs_3;
tmpNestedComplexRhs_2 = tmpNestedComplexRhs_3;
a = tmpNestedComplexRhs_2;
tmpBinaryRight = tmpNestedComplexRhs_2;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedComplexRhs_2;
var tmpNestedComplexRhs_3;
let a = 1;
let b = 2;
tmpNestedComplexRhs_1 = 11;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedComplexRhs_3 = 11;
b = tmpNestedComplexRhs_3;
tmpNestedComplexRhs_2 = tmpNestedComplexRhs_3;
a = tmpNestedComplexRhs_2;
tmpBinaryRight = tmpNestedComplexRhs_2;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, 11);
`````
