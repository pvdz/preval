# Preval test case

# ident_computed_member_simple_simple.md

> Normalize > Binding > Export-default > Ident computed member simple simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
export let a = b[$('x')] = c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 2 };
let c = 3;
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedProp = $('x');
const varInitAssignLhsComputedRhs = c;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 2 };
const varInitAssignLhsComputedProp = $('x');
b[varInitAssignLhsComputedProp] = 3;
const a = 3;
export { a };
$(3, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
