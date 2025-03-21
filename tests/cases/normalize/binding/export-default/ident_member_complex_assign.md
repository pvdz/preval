# Preval test case

# ident_member_complex_assign.md

> Normalize > Binding > Export-default > Ident member complex assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
export let a = $(b).x = $(c).y = $(d);
$(a, b, c, d);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 2 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(3);
const varInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$1;
const a /*:unknown*/ = varInitAssignLhsComputedRhs$1;
export { a };
$(varInitAssignLhsComputedRhs$1, b, 3, 4);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 2 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedObj$1 = $(3);
const varInitAssignLhsComputedRhs$1 = $(4);
varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$1;
const a = varInitAssignLhsComputedRhs$1;
export { a };
$(varInitAssignLhsComputedRhs$1, b, 3, 4);
`````

## Pre Normal


`````js filename=intro
let b = { x: 2 },
  c = 3,
  d = 4;
let a = ($(b).x = $(c).y = $(d));
export { a };
$(a, b, c, d);
`````

## Normalized


`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedRhs$1 = $(d);
varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b, c, d);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 2 };
const b = $( a );
const c = $( 3 );
const d = $( 4 );
c.y = d;
b.x = d;
const e = d;
export { e as a };
$( d, a, 3, 4 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
