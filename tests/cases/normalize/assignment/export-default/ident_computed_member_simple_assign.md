# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > export-default > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
export default a = b[$('x')] = $(c)[$('y')] = $(d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs$1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
export default ((tmpNestedAssignComMemberObj = b),
(tmpNestedAssignComMemberProp = $('x')),
(tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj),
(tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp),
(tmpNestedAssignObj = $(c)),
(tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj),
(tmpNestedAssignComMemberProp$1 = $('y')),
(tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1),
(tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1),
(tmpNestedAssignCompMemberRhs$1 = $(d)),
(tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1),
(tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1),
(tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs),
(a = tmpNestedAssignCompMemberRhs));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs$1;
let a = 1;
let b = { x: 2 };
export default ((tmpNestedAssignComMemberObj = b),
(tmpNestedAssignComMemberProp = $('x')),
(tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj),
(tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp),
(tmpNestedAssignObj = $(3)),
(tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj),
(tmpNestedAssignComMemberProp$1 = $('y')),
(tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1),
(tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1),
(tmpNestedAssignCompMemberRhs$1 = $(4)),
(tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1),
(tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1),
(tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs),
(a = tmpNestedAssignCompMemberRhs));
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
