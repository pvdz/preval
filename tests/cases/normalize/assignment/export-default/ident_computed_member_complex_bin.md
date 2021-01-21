# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > export-default > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
export default a = $(b)[$('x')] = c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
export default ((tmpNestedAssignCompMemberObj = $(b)),
(tmpNestedAssignCompMemberProp = $('x')),
(tmpNestedAssignCompMemberRhs = c + d),
(tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs),
(a = tmpNestedAssignCompMemberRhs));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
export default ((tmpNestedAssignCompMemberObj = $(b)),
(tmpNestedAssignCompMemberProp = $('x')),
(tmpNestedAssignCompMemberRhs = 7),
(tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs),
(a = tmpNestedAssignCompMemberRhs));
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same