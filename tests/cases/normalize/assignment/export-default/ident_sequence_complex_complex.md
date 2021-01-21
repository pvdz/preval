# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
export default a = ($(b), $(c)).x = $(c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
let c = 3;
export default ($(b),
(tmpNestedAssignMemberObj = $(c)),
(tmpNestedAssignMemberRhs = $(c)),
(tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs),
(a = tmpNestedAssignMemberRhs));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
export default ($(2),
(tmpNestedAssignMemberObj = $(3)),
(tmpNestedAssignMemberRhs = $(3)),
(tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs),
(a = tmpNestedAssignMemberRhs));
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same