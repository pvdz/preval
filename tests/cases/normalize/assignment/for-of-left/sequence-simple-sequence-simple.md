# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > for-of-left > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
for (((a, b).c = (a, b).c = d).x of []);
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
let c = 'unused';
let d = 3;
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of []) {
    {
      a;
      tmpNestedAssignMemberObj = b;
      a;
      tmpNestedAssignObj = b;
      tmpNestedAssignObj.c = d;
      tmpNestedAssignMemberRhs = d;
      tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
      tmpAssignMemLhsObj = tmpNestedAssignMemberRhs;
      tmpAssignMemRhs = tmpForOfLhsNode;
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
let tmpForOfLhsNode;
for (tmpForOfLhsNode of []) {
  tmpNestedAssignMemberObj = b;
  tmpNestedAssignObj = b;
  tmpNestedAssignObj.c = 3;
  tmpNestedAssignMemberRhs = 3;
  tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
  tmpAssignMemLhsObj = tmpNestedAssignMemberRhs;
  tmpAssignMemRhs = tmpForOfLhsNode;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: 1,{"c":2},"unused",3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
