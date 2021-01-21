# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > for-in-left > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for ((a = $(b)[$('x')] = $(c)[$('y')] = $(d)).x in {});
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedComplexRhs;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in {}) {
    {
      tmpNestedAssignCompMemberObj = $(b);
      tmpNestedAssignCompMemberProp = $('x');
      tmpNestedAssignCompMemberObj_1 = $(c);
      tmpNestedAssignCompMemberProp_1 = $('y');
      tmpNestedAssignCompMemberRhs_1 = $(d);
      tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
      tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
      tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
      tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
      a = tmpNestedComplexRhs;
      tmpAssignMemLhsObj = tmpNestedComplexRhs;
      tmpAssignMemRhs = tmpForInLhsNode;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedComplexRhs;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
let tmpForInLhsNode;
for (tmpForInLhsNode in {}) {
  tmpNestedAssignCompMemberObj = $(b);
  tmpNestedAssignCompMemberProp = $('x');
  tmpNestedAssignCompMemberObj_1 = $(3);
  tmpNestedAssignCompMemberProp_1 = $('y');
  tmpNestedAssignCompMemberRhs_1 = $(4);
  tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
  tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
  a = tmpNestedComplexRhs;
  tmpAssignMemLhsObj = tmpNestedComplexRhs;
  tmpAssignMemRhs = tmpForInLhsNode;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: 1,{"x":2},3,4
 - 1: undefined

Normalized calls: Same

Final output calls: Same
