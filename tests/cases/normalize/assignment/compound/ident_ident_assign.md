# Preval test case

# ident_ident_assign.md

> normalize > assignment > stmt > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
a *= b -= $(c).y += $(d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpNestedAssignMemberObj = $(c);
tmpNestedAssignMemberRhs = $(d);
{
  tmpAssignMemLhsObj = tmpNestedAssignMemberObj;
  tmpBinaryLeft = tmpNestedAssignMemberObj.y;
  tmpAssignMemRhs = tmpBinaryLeft + tmpNestedAssignMemberRhs;
  tmpAssignMemLhsObj.y = tmpAssignMemRhs;
}
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
b = b - tmpNestedComplexRhs;
a = a * tmpNestedComplexRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = 2;
tmpNestedAssignMemberObj = $(3);
tmpNestedAssignMemberRhs = $(4);
tmpAssignMemLhsObj = tmpNestedAssignMemberObj;
tmpBinaryLeft = tmpNestedAssignMemberObj.y;
tmpAssignMemRhs = tmpBinaryLeft + tmpNestedAssignMemberRhs;
tmpAssignMemLhsObj.y = tmpAssignMemRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
b = b - tmpNestedComplexRhs;
a = a * tmpNestedComplexRhs;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: null,null,3
 - 3: undefined

Normalized calls: BAD?!
[[3], [4], [4, -2, 3], null];

Final output calls: BAD!!
[[3], [4], [4, -2, 3], null];

