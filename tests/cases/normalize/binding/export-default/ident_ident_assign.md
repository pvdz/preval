# Preval test case

# ident_ident_assign.md

> normalize > assignment > export-default > ident_ident_assign
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
let a;
let tmpNestedComplexRhs;
const tmpNestedAssignObj = $(c);
let tmpNestedAssignPropRhs = $(d);
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
export { a };
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 2;
let a;
let tmpNestedComplexRhs;
const tmpNestedAssignObj = $(3);
let tmpNestedAssignPropRhs = $(4);
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
export { a };
$(a, b, 3);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
