# Preval test case

# ident_computed_member_simple_bin.md

> Normalize > Binding > Export-default > Ident computed member simple bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
export let a = b[$('x')] = c + d;
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 2 },
  c = 3,
  d = 4;
let a = (b[$(`x`)] = c + d);
export { a };
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedRhs = c + d;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 2 };
const varInitAssignLhsComputedProp = $(`x`);
b[varInitAssignLhsComputedProp] = 7;
const a = 7;
export { a };
$(7, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
