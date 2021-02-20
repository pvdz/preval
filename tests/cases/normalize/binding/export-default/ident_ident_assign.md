# Preval test case

# ident_ident_assign.md

> Normalize > Binding > Export-default > Ident ident assign
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
let b = 2;
let c = 3;
let d = 4;
const tmpNestedAssignObj = $(c);
const tmpNestedAssignPropRhs = $(d);
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
b = tmpNestedPropAssignRhs;
let a = b;
export { a };
$(a, b, c);
`````

## Output

`````js filename=intro
const tmpNestedAssignObj = $(3);
const tmpNestedAssignPropRhs = $(4);
tmpNestedAssignObj.y = tmpNestedAssignPropRhs;
const a = tmpNestedAssignPropRhs;
export { a };
$(tmpNestedAssignPropRhs, tmpNestedAssignPropRhs, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
