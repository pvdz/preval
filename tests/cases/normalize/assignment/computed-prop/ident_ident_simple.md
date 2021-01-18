# Preval test case

# ident_ident_simple.md

> normalize > assignment > computed-prop > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let obj = {};
obj[a = b = c] = 1000;
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
b = c;
tmpNestedComplexRhs = c;
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
let b = 2;
let obj = {};
tmpAssignedComputedObj = obj;
b = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpAssignedComputedProp = tmpNestedComplexRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, b, 3);
`````

## Result

Should call `$` with:
[[3, 3, 3], null];

Normalized calls: Same

Final output calls: Same
