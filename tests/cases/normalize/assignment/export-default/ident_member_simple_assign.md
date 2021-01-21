# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > export-default > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
export default a = b.x = $(c).y = $(d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
export default ((tmpNestedAssignMemberObj = b),
(tmpNestedAssignObj = $(c)),
(tmpNestedAssignMemberObj_1 = tmpNestedAssignObj),
(tmpNestedAssignMemberRhs_1 = $(d)),
(tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1),
(tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1),
(tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs),
(a = tmpNestedAssignMemberRhs));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
export default ((tmpNestedAssignMemberObj = b),
(tmpNestedAssignObj = $(3)),
(tmpNestedAssignMemberObj_1 = tmpNestedAssignObj),
(tmpNestedAssignMemberRhs_1 = $(4)),
(tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1),
(tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1),
(tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs),
(a = tmpNestedAssignMemberRhs));
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
