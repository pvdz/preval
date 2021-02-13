# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > export-default > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
export let a = $(b).x = c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 2 };
let c = 3;
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedRhs = c;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 2 };
const varInitAssignLhsComputedObj = $(b);
varInitAssignLhsComputedObj.x = 3;
let a = 3;
export { a };
$(3, b, 3);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
