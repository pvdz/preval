# Preval test case

# ident_ident_bin.md

> normalize > assignment > binary-right > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$(500 + ($(500 + (a = b = c + d))));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpArg_1;
var tmpBinaryRight_1;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpNestedComplexRhs_1 = c + d;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpBinaryRight_1 = tmpNestedComplexRhs;
tmpArg_1 = 500 + tmpBinaryRight_1;
tmpBinaryRight = $(tmpArg_1);
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpArg_1;
var tmpBinaryRight_1;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
let a = 1;
let b = 2;
tmpNestedComplexRhs_1 = 7;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpBinaryRight_1 = tmpNestedComplexRhs;
tmpArg_1 = 500 + tmpBinaryRight_1;
tmpBinaryRight = $(tmpArg_1);
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, 7);
`````

## Result

Should call `$` with:
[[507], [null], [7, 7, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[[507], [null], [7, 7, 7], null];

