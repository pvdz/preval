# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
for (((a, $(b)).c = d).x in {});
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpNestedAssignObj;
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
    tmpNestedPropAssignRhs = d;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    tmpAssignMemLhsObj = tmpNestedPropAssignRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
let tmpForInLhsNode;
for (tmpForInLhsNode in {}) {
  tmpNestedAssignObj = $(b);
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  tmpAssignMemLhsObj = tmpNestedPropAssignRhs;
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
