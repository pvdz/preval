# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > export-default > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
export let a = b.x = $(c).y = $(d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
let a;
let tmpNestedAssignPropRhs;
const tmpNestedAssignObj = $(c);
let tmpNestedAssignPropRhs$1 = $(d);
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
b.x = tmpNestedPropAssignRhs$1;
a = tmpNestedPropAssignRhs$1;
export { a };
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 2 };
let a;
let tmpNestedAssignPropRhs;
const tmpNestedAssignObj = $(3);
let tmpNestedAssignPropRhs$1 = $(4);
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
b.x = tmpNestedPropAssignRhs$1;
a = tmpNestedPropAssignRhs$1;
export { a };
$(a, b, 3);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
