# Preval test case

# ident_ident_bin.md

> normalize > assignment > computed-prop > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
let obj = {};
obj[a = b = c + d] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
let obj = {};
tmpAssignedComputedObj = obj;
tmpNestedComplexRhs_1 = c + d;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpAssignedComputedProp = tmpNestedComplexRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
let a = 1;
let b = 2;
let obj = {};
tmpAssignedComputedObj = obj;
tmpNestedComplexRhs_1 = 7;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpAssignedComputedProp = tmpNestedComplexRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, b, 7);
`````

## Result

Should call `$` with:
[[7, 7, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[[7, 7, 7], null];

