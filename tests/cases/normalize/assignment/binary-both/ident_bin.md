# Preval test case

# ident_bin.md

> normalize > assignment > binary-both > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = b + c) + (a = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
let a = 1;
let b = 2;
let c = 3;
tmpNestedComplexRhs = b + c;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedComplexRhs_1 = b + c;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
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
let a = 1;
tmpNestedComplexRhs = 8;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedComplexRhs_1 = 8;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, 8, 3);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: 5,2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[16], [8, 8, 3], null];

