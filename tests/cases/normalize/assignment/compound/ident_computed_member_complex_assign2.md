# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > stmt > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
$(1).x += $(2)
`````

## Normalized

`````js filename=intro
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
tmpCompoundAssignObj = $(1);
tmpCompoundAssignRhs = $(2);
{
  tmpAssignMemLhsObj = tmpCompoundAssignObj;
  tmpBinaryLeft = tmpCompoundAssignObj.x;
  tmpAssignMemRhs = tmpBinaryLeft + tmpCompoundAssignRhs;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
`````

## Output

`````js filename=intro
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
tmpCompoundAssignObj = $(1);
tmpCompoundAssignRhs = $(2);
tmpAssignMemLhsObj = tmpCompoundAssignObj;
tmpBinaryLeft = tmpCompoundAssignObj.x;
tmpAssignMemRhs = tmpBinaryLeft + tmpCompoundAssignRhs;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: undefined

Normalized calls: Same

Final output calls: Same
