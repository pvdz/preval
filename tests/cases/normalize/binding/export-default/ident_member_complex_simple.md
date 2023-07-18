# Preval test case

# ident_member_complex_simple.md

> Normalize > Binding > Export-default > Ident member complex simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
export let a = $(b).x = c;
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 2 },
  c = 3;
let a = ($(b).x = c);
export { a };
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
const b = { x: 2 };
const varInitAssignLhsComputedObj = $(b);
varInitAssignLhsComputedObj.x = 3;
const a = 3;
export { a };
$(3, b, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 2 };
const b = $( a );
b.x = 3;
const c = 3;
export { c as a from "undefined"
$( 3, a, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
