# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > for-in-left > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for ((a = b.x = c).x in {});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in {}) {
    tmpNestedPropAssignRhs = c;
    b.x = tmpNestedPropAssignRhs;
    tmpNestedComplexRhs = tmpNestedPropAssignRhs;
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let tmpForInLhsNode;
for (tmpForInLhsNode in {}) {
  tmpNestedPropAssignRhs = 3;
  b.x = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpAssignMemLhsObj = tmpNestedComplexRhs;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 1,{"x":2},3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
