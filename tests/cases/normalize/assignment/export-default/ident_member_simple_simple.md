# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > export-default > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
export default a = b.x = c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
export default ((tmpNestedPropAssignRhs = c), (b.x = tmpNestedPropAssignRhs), (a = tmpNestedPropAssignRhs));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
export default ((tmpNestedPropAssignRhs = 3), (b.x = tmpNestedPropAssignRhs), (a = tmpNestedPropAssignRhs));
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
