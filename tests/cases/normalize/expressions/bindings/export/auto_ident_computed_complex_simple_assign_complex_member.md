# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> normalize > expressions > bindings > export > auto_ident_computed_complex_simple_assign_complex_member
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

export let a = ($(b)["c"] = $(b)[$("d")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj['c'] = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj['c'] = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same