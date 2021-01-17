# Preval test case

# sequence-simple.md

> normalize > assignment > stmt > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
(a, b).c *= d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft;
let a = 1;
let b = { c: 2 };
let d = 3;
a;
tmpAssignMemLhsObj = b;
tmpAssignMemRhs = d;
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpBinaryLeft = tmpAssignMemLhsObj.c;
tmpAssignMemRhs_1 = tmpBinaryLeft * tmpAssignMemRhs;
tmpAssignMemLhsObj_1.c = tmpAssignMemRhs_1;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft;
let b = { c: 2 };
tmpAssignMemLhsObj = b;
tmpAssignMemRhs = 3;
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpBinaryLeft = tmpAssignMemLhsObj.c;
tmpAssignMemRhs_1 = tmpBinaryLeft * tmpAssignMemRhs;
tmpAssignMemLhsObj_1.c = tmpAssignMemRhs_1;
$(1, b, c, 3);
`````
