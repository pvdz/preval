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
var tmpNestedComplexRhs$1;
var tmpNestedComplexRhs$2;
var tmpNestedComplexRhs$3;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpNestedComplexRhs$1 = c + d;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedComplexRhs$3 = c + d;
b = tmpNestedComplexRhs$3;
tmpNestedComplexRhs$2 = tmpNestedComplexRhs$3;
a = tmpNestedComplexRhs$2;
tmpBinaryRight = tmpNestedComplexRhs$2;
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
var tmpNestedComplexRhs$1;
var tmpNestedComplexRhs$2;
var tmpNestedComplexRhs$3;
let a = 1;
let b = 2;
tmpNestedComplexRhs$1 = 11;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedComplexRhs$3 = 11;
b = tmpNestedComplexRhs$3;
tmpNestedComplexRhs$2 = tmpNestedComplexRhs$3;
a = tmpNestedComplexRhs$2;
tmpBinaryRight = tmpNestedComplexRhs$2;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, 11);
`````

## Result

Should call `$` with:
 - 0: 14
 - 1: 7,7,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[22], [11, 11, 11], null];

