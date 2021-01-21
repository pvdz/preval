# Preval test case

# ident_ident_simple.md

> normalize > assignment > binary-both > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = b = c) + (a = b = c));
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
b = c;
tmpNestedComplexRhs = c;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
b = c;
tmpNestedComplexRhs_1 = c;
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
let b = 2;
b = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
b = 3;
tmpNestedComplexRhs_1 = 3;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 6
 - 1: 3,3,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same