# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > bindings > export > auto_ident_prop_s-seq_assign_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

export let a = ((1, 2, b).c = 2);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedRhs = 2;
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
const varInitAssignLhsComputedObj = b;
varInitAssignLhsComputedObj.c = 2;
let a = 2;
export { a };
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same