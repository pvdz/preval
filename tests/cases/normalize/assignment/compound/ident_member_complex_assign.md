# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > stmt > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
a *= $(b).x += $(c).y -= $(d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignMemberObj = $(b);
tmpNestedAssignMemberObj_1 = $(c);
tmpNestedAssignMemberRhs_1 = $(d);
tmpAssignMemLhsObj = tmpNestedAssignMemberObj_1;
tmpBinaryLeft = tmpNestedAssignMemberObj_1.y;
tmpAssignMemRhs = tmpBinaryLeft - tmpNestedAssignMemberRhs_1;
tmpAssignMemLhsObj.y = tmpAssignMemRhs;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpAssignMemLhsObj_1 = tmpNestedAssignMemberObj;
tmpBinaryLeft_1 = tmpNestedAssignMemberObj.x;
tmpAssignMemRhs_1 = tmpBinaryLeft_1 + tmpNestedAssignMemberRhs;
tmpAssignMemLhsObj_1.x = tmpAssignMemRhs_1;
a = a * tmpNestedAssignMemberRhs;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignMemberObj = $(b);
tmpNestedAssignMemberObj_1 = $(3);
tmpNestedAssignMemberRhs_1 = $(4);
tmpAssignMemLhsObj = tmpNestedAssignMemberObj_1;
tmpBinaryLeft = tmpNestedAssignMemberObj_1.y;
tmpAssignMemRhs = tmpBinaryLeft - tmpNestedAssignMemberRhs_1;
tmpAssignMemLhsObj.y = tmpAssignMemRhs;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpAssignMemLhsObj_1 = tmpNestedAssignMemberObj;
tmpBinaryLeft_1 = tmpNestedAssignMemberObj.x;
tmpAssignMemRhs_1 = tmpBinaryLeft_1 + tmpNestedAssignMemberRhs;
tmpAssignMemLhsObj_1.x = tmpAssignMemRhs_1;
a = a * tmpNestedAssignMemberRhs;
$(a, b, 3, 4);
`````
