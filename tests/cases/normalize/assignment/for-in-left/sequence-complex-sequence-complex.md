# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > for-in-left > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
for (((a, $(b)).c = (a, $(b)).c = d).x in {});;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in {}) {
    a;
    tmpNestedAssignObj = $(b);
    tmpNestedAssignMemberObj = tmpNestedAssignObj;
    a;
    tmpNestedAssignObj$1 = $(b);
    tmpNestedPropAssignRhs = d;
    tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
    tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
    tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
    tmpAssignMemLhsObj = tmpNestedAssignMemberRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
let tmpForInLhsNode;
for (tmpForInLhsNode in {}) {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignObj$1 = $(b);
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
  tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
  tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
  tmpAssignMemLhsObj = tmpNestedAssignMemberRhs;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: 1,{"c":2},"unused",3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
