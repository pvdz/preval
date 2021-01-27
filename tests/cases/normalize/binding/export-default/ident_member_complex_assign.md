# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > export-default > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
export let a = $(b).x = $(c).y = $(d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let b = { x: 2 };
let c = 3;
let d = 4;
export let a =
  ((tmpAssignMemLhsObj = $(b)),
  (((tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj),
  ((tmpNestedAssignObj = $(c)),
  ((tmpNestedAssignMemberObj = tmpNestedAssignObj),
  (tmpNestedAssignMemberRhs = $(d)),
  (tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs),
  (tmpAssignMemRhs = tmpNestedAssignMemberRhs))),
  (tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1)),
  (tmpAssignMemLhsObj$2.x = tmpAssignMemRhs)));
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let b = { x: 2 };
export let a =
  ((tmpAssignMemLhsObj = $(b)),
  (((tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj),
  ((tmpNestedAssignObj = $(3)),
  ((tmpNestedAssignMemberObj = tmpNestedAssignObj),
  (tmpNestedAssignMemberRhs = $(4)),
  (tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs),
  (tmpAssignMemRhs = tmpNestedAssignMemberRhs))),
  (tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1)),
  (tmpAssignMemLhsObj$2.x = tmpAssignMemRhs)));
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
