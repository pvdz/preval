# Preval test case

# member_complex_bin.md

> normalize > assignment > for-in-left > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (($(a).x = b + c).x in {});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in {}) {
    tmpNestedAssignObj = $(a);
    tmpNestedAssignMemberObj = tmpNestedAssignObj;
    tmpNestedAssignMemberRhs = b + c;
    tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
    tmpAssignMemLhsObj = tmpNestedAssignMemberRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = { x: 10 };
let tmpForInLhsNode;
for (tmpForInLhsNode in {}) {
  tmpNestedAssignObj = $(a);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = 5;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpAssignMemLhsObj = tmpNestedAssignMemberRhs;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10},2,3
 - 1: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 10 }, 5, 3], null];

