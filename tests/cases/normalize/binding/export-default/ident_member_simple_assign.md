# Preval test case

# ident_member_simple_assign.md

> Normalize > Binding > Export-default > Ident member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
export let a = b.x = $(c).y = $(d);
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 2 },
  c = 3,
  d = 4;
let a = (b.x = $(c).y = $(d));
export { a };
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedRhs$1 = $(d);
varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
b.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b, c);
`````

## Output

`````js filename=intro
const varInitAssignLhsComputedObj = $(3);
const varInitAssignLhsComputedRhs$1 = $(4);
varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
const b = { x: 2 };
b.x = varInitAssignLhsComputedRhs$1;
const a = varInitAssignLhsComputedRhs$1;
export { a };
$(varInitAssignLhsComputedRhs$1, b, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
a.y = b;
const c = { x: 2 };
c.x = b;
const d = b;
export { d as a from "undefined"
$( b, c, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
