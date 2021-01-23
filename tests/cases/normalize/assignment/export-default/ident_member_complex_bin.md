# Preval test case

# ident_member_complex_bin.md

> normalize > assignment > export-default > ident_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
export default a = $(b).x = c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
export default ((tmpNestedAssignObj = $(b)),
(tmpNestedAssignMemberObj = tmpNestedAssignObj),
(tmpNestedAssignMemberRhs = c + d),
(tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs),
(a = tmpNestedAssignMemberRhs));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
export default ((tmpNestedAssignObj = $(b)),
(tmpNestedAssignMemberObj = tmpNestedAssignObj),
(tmpNestedAssignMemberRhs = 7),
(tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs),
(a = tmpNestedAssignMemberRhs));
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
