# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> normalize > expressions > assignments > export_default > auto_ident_computed_simple_simple_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
export default a = b["c"] = $(b)[$("d")];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
b.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpExportDefault = a;
export { tmpExportDefault as default };
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
b.c = tmpNestedAssignPropRhs;
const tmpExportDefault = tmpNestedAssignPropRhs;
export { tmpExportDefault as default };
$(tmpNestedAssignPropRhs, b);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
