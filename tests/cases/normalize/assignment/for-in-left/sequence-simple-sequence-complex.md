# Preval test case

# sequence-simple-sequence-complex.md

> normalize > assignment > for-in-left > sequence-simple-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
for (((a, b).c = (a, $(b)).c = d).x in {});
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in {}) {
    {
      a;
      tmpNestedAssignMemberObj = b;
      a;
      tmpNestedAssignObj = $(b);
      tmpNestedAssignObj.c = d;
      tmpNestedAssignMemberRhs = d;
      tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
      tmpAssignMemLhsObj = tmpNestedAssignMemberRhs;
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
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
let tmpForInLhsNode;
for (tmpForInLhsNode in {}) {
  tmpNestedAssignMemberObj = b;
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.c = 3;
  tmpNestedAssignMemberRhs = 3;
  tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
  tmpAssignMemLhsObj = tmpNestedAssignMemberRhs;
  tmpAssignMemRhs = tmpForInLhsNode;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
