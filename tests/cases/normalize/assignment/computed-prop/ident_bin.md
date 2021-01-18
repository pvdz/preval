# Preval test case

# ident_bin.md

> normalize > assignment > computed-prop > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let obj = {};
obj[a = b + c] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
let obj = {};
tmpAssignedComputedObj = obj;
tmpNestedComplexRhs = b + c;
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
let a = 1;
let obj = {};
tmpAssignedComputedObj = obj;
tmpNestedComplexRhs = 5;
a = tmpNestedComplexRhs;
tmpAssignedComputedProp = tmpNestedComplexRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, 5, 3);
`````

## Result

Should call `$` with:
[[5, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[[5, 5, 3], null];

