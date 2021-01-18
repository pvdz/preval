# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > export-default > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
export default a = $(b)[$('x')] = c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let c = 3;
export default ((tmpNestedAssignComMemberObj = $(b)),
(tmpNestedAssignComMemberProp = $('x')),
(tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c),
(a = c));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
export default ((tmpNestedAssignComMemberObj = $(b)),
(tmpNestedAssignComMemberProp = $('x')),
(tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3),
(a = 3));
$(a, b, 3);
`````

## Result

Should call `$` with:
["<crash[ Unexpected token 'export' ]>"];

Normalized calls: Same

Final output calls: Same
