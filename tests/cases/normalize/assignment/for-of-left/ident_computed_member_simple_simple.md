# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > for-of-left > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for ((a = b[$('x')] = c).x of []);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of []) {
    {
      tmpNestedAssignComMemberObj = b;
      tmpNestedAssignComMemberProp = $('x');
      tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c;
      tmpNestedComplexRhs = c;
      a = tmpNestedComplexRhs;
      tmpAssignMemLhsObj = tmpNestedComplexRhs;
      tmpAssignMemRhs = tmpForOfLhsNode;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let tmpForOfLhsNode;
for (tmpForOfLhsNode of []) {
  tmpNestedAssignComMemberObj = b;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
  tmpNestedComplexRhs = 3;
  a = tmpNestedComplexRhs;
  tmpAssignMemLhsObj = tmpNestedComplexRhs;
  tmpAssignMemRhs = tmpForOfLhsNode;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 1,{"x":2},3
 - 1: undefined

Normalized calls: Same

Final output calls: Same