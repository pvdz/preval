# Preval test case

# ident_ident_assign.md

> normalize > assignment > export-default > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = 2, c = 3, d = 4;
export let a = b = $(c).y = $(d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let b = 2;
let c = 3;
let d = 4;
export let a =
  ((tmpNestedAssignObj = $(c)),
  ((tmpNestedAssignMemberObj = tmpNestedAssignObj),
  (tmpNestedAssignMemberRhs = $(d)),
  (tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs),
  (b = tmpNestedAssignMemberRhs)));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let b = 2;
export let a =
  ((tmpNestedAssignObj = $(3)),
  ((tmpNestedAssignMemberObj = tmpNestedAssignObj),
  (tmpNestedAssignMemberRhs = $(4)),
  (tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs),
  (b = tmpNestedAssignMemberRhs)));
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
