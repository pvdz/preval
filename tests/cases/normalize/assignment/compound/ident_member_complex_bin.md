# Preval test case

# ident_member_complex_bin.md

> normalize > assignment > stmt > ident_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
a *= $(b).x += c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignMemberObj = $(b);
tmpNestedAssignMemberRhs = c + d;
tmpAssignMemLhsObj = tmpNestedAssignMemberObj;
tmpBinaryLeft = tmpNestedAssignMemberObj.x;
tmpAssignMemRhs = tmpBinaryLeft + tmpNestedAssignMemberRhs;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = a * tmpNestedAssignMemberRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
tmpNestedAssignMemberObj = $(b);
tmpNestedAssignMemberRhs = 7;
tmpAssignMemLhsObj = tmpNestedAssignMemberObj;
tmpBinaryLeft = tmpNestedAssignMemberObj.x;
tmpAssignMemRhs = tmpBinaryLeft + tmpNestedAssignMemberRhs;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = a * tmpNestedAssignMemberRhs;
$(a, b, 7);
`````
