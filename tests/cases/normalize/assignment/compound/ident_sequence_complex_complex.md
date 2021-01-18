# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
a *= ($(b), $(c)).x += $(c);
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
let b = 2;
let c = 3;
$(b);
tmpNestedAssignMemberObj = $(c);
tmpNestedAssignMemberRhs = $(c);
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
$(2);
tmpNestedAssignMemberObj = $(3);
tmpNestedAssignMemberRhs = $(3);
tmpAssignMemLhsObj = tmpNestedAssignMemberObj;
tmpBinaryLeft = tmpNestedAssignMemberObj.x;
tmpAssignMemRhs = tmpBinaryLeft + tmpNestedAssignMemberRhs;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = a * tmpNestedAssignMemberRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[2], [3], "<crash[ Cannot read property 'x' of undefined ]>"];

Normalized calls: BAD?!
[[2], [3], [3], "<crash[ Cannot read property 'x' of undefined ]>"];

Final output calls: BAD!!
[[2], [3], [3], "<crash[ Cannot read property 'x' of undefined ]>"];

