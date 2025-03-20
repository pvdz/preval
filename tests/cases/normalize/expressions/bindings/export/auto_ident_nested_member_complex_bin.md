# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Bindings > Export > Auto ident nested member complex bin
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

export let a = ($(b)[$("x")] = $(c)[$("y")] = d + e);
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
const a /*:number*/ = 7;
export { a };
$(7, b, c, 3, 4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const c = { y: 2 };
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
const a = 7;
export { a };
$(7, b, c, 3, 4);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( "x" );
const d = { y: 2 };
const e = $( d );
const f = $( "y" );
e[f] = 7;
b[c] = 7;
const g = 7;
export { g as a };
$( 7, a, d, 3, 4 );
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
