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
let b = { x: 2 };
let c = 3;
let d = 4;
let a;
const tmpNestedAssignObj = $(b);
let tmpNestedAssignPropRhs;
const tmpNestedAssignObj$1 = $(c);
let tmpNestedAssignPropRhs$1 = $(d);
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
tmpNestedAssignObj$1.y = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs$1;
a = tmpNestedPropAssignRhs$1;
export { a };
$(a, b, c, d);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
