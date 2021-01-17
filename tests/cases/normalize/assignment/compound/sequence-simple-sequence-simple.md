# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > stmt > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
(a, b).c *= (a, b).c += d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft;
var tmpAssignMemLhsObj_2;
var tmpAssignMemRhs_2;
var tmpBinaryLeft_1;
let a = 1;
let b = { c: 2 };
let d = 3;
a;
tmpAssignMemLhsObj = b;
a;
tmpNestedAssignObj = b;
tmpAssignMemLhsObj_1 = tmpNestedAssignObj;
tmpBinaryLeft = tmpNestedAssignObj.c;
tmpAssignMemRhs_1 = tmpBinaryLeft + d;
tmpAssignMemLhsObj_1.c = tmpAssignMemRhs_1;
tmpAssignMemRhs = d;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj;
tmpBinaryLeft_1 = tmpAssignMemLhsObj.c;
tmpAssignMemRhs_2 = tmpBinaryLeft_1 * tmpAssignMemRhs;
tmpAssignMemLhsObj_2.c = tmpAssignMemRhs_2;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft;
var tmpAssignMemLhsObj_2;
var tmpAssignMemRhs_2;
var tmpBinaryLeft_1;
let b = { c: 2 };
tmpAssignMemLhsObj = b;
tmpNestedAssignObj = b;
tmpAssignMemLhsObj_1 = tmpNestedAssignObj;
tmpBinaryLeft = tmpNestedAssignObj.c;
tmpAssignMemRhs_1 = tmpBinaryLeft + 3;
tmpAssignMemLhsObj_1.c = tmpAssignMemRhs_1;
tmpAssignMemRhs = 3;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj;
tmpBinaryLeft_1 = tmpAssignMemLhsObj.c;
tmpAssignMemRhs_2 = tmpBinaryLeft_1 * tmpAssignMemRhs;
tmpAssignMemLhsObj_2.c = tmpAssignMemRhs_2;
$(1, b, c, 3);
`````
