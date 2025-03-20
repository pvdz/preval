# Preval test case

# ident_computed_member_simple_assign.md

> Normalize > Binding > Export-default > Ident computed member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
export let a = b[$('x')] = $(c)[$('y')] = $(d);
$(a, b, c);
`````


## Settled


`````js filename=intro
const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(3);
const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
const varInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const b /*:object*/ = { x: 2 };
b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
const a /*:unknown*/ = varInitAssignLhsComputedRhs$1;
export { a };
$(varInitAssignLhsComputedRhs$1, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(3);
const varInitAssignLhsComputedProp$1 = $(`y`);
const varInitAssignLhsComputedRhs$1 = $(4);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const b = { x: 2 };
b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
const a = varInitAssignLhsComputedRhs$1;
export { a };
$(varInitAssignLhsComputedRhs$1, b, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = $( 3 );
const c = $( "y" );
const d = $( 4 );
b[c] = d;
const e = { x: 2 };
e[a] = d;
const f = d;
export { f as a };
$( d, e, 3 );
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
