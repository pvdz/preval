# Preval test case

# ident_ident_bin.md

> normalize > assignment > obj-spread > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$({...(a = b = c + d)});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjSpreadArg;
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
tmpObjSpreadArg = tmpNestedComplexRhs;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjSpreadArg;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
let a = 1;
let b = 2;
tmpNestedComplexRhs_1 = 7;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpObjSpreadArg = tmpNestedComplexRhs;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: {}
 - 1: 7,7,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{}], [7, 7, 7], null];
