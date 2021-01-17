# Preval test case

# sequence-simple-sequence-complex.md

> normalize > assignment > for-of-left > sequence-simple-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
for (((a, b).c = (a, $(b)).c = d).x of []);
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
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of []) {
    a;
    tmpNestedAssignMemberObj = b;
    a;
    tmpNestedAssignObj = $(b);
    tmpNestedAssignObj.c = d;
    tmpNestedAssignMemberRhs = d;
    tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
    tmpAssignMemLhsObj = tmpNestedAssignMemberRhs;
    tmpAssignMemRhs = tmpForOfLhsNode;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
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
let tmpForOfLhsNode;
for (tmpForOfLhsNode of []) {
  tmpNestedAssignMemberObj = b;
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.c = 3;
  tmpNestedAssignMemberRhs = 3;
  tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
  tmpAssignMemLhsObj = tmpNestedAssignMemberRhs;
  tmpAssignMemRhs = tmpForOfLhsNode;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
$(1, b, c, 3);
`````
