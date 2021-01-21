# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > for-of-left > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for ((a = $(b)[$('x')] = c).x of []);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of []) {
    tmpNestedAssignObj = $(b);
    tmpNestedAssignComMemberObj = tmpNestedAssignObj;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedPropAssignRhs = c;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    tmpNestedComplexRhs = tmpNestedPropAssignRhs;
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let tmpForOfLhsNode;
for (tmpForOfLhsNode of []) {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignComMemberObj = tmpNestedAssignObj;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpAssignMemLhsObj = tmpNestedComplexRhs;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 1,{"x":2},3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
