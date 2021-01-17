# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > computed-prop > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
let obj = {};
obj[a = b.x = c] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpNestedComplexRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let obj = {};
tmpAssignedComputedObj = obj;
b.x = c;
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
let b = { x: 2 };
let obj = {};
tmpAssignedComputedObj = obj;
b.x = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpAssignedComputedProp = tmpNestedComplexRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, b, 3);
`````
