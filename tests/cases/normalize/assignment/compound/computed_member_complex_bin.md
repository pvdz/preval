# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > stmt > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(a)[$('x')] *= b + c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpAssignMemLhsObj = $(a);
tmpAssignMemRhs = b + c;
tmpAssignedComputedObj = tmpAssignMemLhsObj;
tmpAssignedComputedProp = $('x');
tmpAssignMemLhsObj_1 = tmpAssignedComputedObj;
tmpBinaryLeft = tmpAssignedComputedObj[tmpAssignedComputedProp];
tmpAssignMemRhs_1 = tmpBinaryLeft * tmpAssignMemRhs;
tmpAssignMemLhsObj_1[tmpAssignedComputedProp] = tmpAssignMemRhs_1;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpAssignMemRhs = 5;
tmpAssignedComputedObj = tmpAssignMemLhsObj;
tmpAssignedComputedProp = $('x');
tmpAssignMemLhsObj_1 = tmpAssignedComputedObj;
tmpBinaryLeft = tmpAssignedComputedObj[tmpAssignedComputedProp];
tmpAssignMemRhs_1 = tmpBinaryLeft * tmpAssignMemRhs;
tmpAssignMemLhsObj_1[tmpAssignedComputedProp] = tmpAssignMemRhs_1;
$(a, 5, 3);
`````
