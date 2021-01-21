# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > stmt > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
$(1).x += $(2);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpBinaryLeft;
var tmpBinaryRight;
tmpAssignMemLhsObj = $(1);
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpBinaryRight = $(2);
tmpAssignMemRhs = tmpBinaryLeft + tmpBinaryRight;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpBinaryLeft;
var tmpBinaryRight;
tmpAssignMemLhsObj = $(1);
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpBinaryRight = $(2);
tmpAssignMemRhs = tmpBinaryLeft + tmpBinaryRight;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: undefined

Normalized calls: Same

Final output calls: Same
