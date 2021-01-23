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
var tmpArg$1;
var tmpBinaryRight;
var tmpBinaryRight$1;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpNestedComplexRhs$1 = c + d;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpBinaryRight$1 = tmpNestedComplexRhs;
tmpArg$1 = 500 + tmpBinaryRight$1;
tmpBinaryRight = $(tmpArg$1);
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpBinaryRight;
var tmpBinaryRight$1;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
let b = 2;
tmpNestedComplexRhs$1 = 7;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpBinaryRight$1 = tmpNestedComplexRhs;
tmpArg$1 = 500 + tmpBinaryRight$1;
tmpBinaryRight = $(tmpArg$1);
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: 507
 - 1: 1007
 - 2: 7,7,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[507], [1007], [7, 7, 7], null];

