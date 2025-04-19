# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Statement > Export default > Auto ident nested member complex call
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
export default $(b)[$("x")] = $(c)[$("y")] = $(d);
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = $(3);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs$1;
const tmpAnonDefaultExport /*:unknown*/ = tmpInitAssignLhsComputedRhs$1;
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b, c, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpInitAssignLhsComputedObj = $(b);
const tmpInitAssignLhsComputedProp = $(`x`);
const c = { y: 2 };
const tmpInitAssignLhsComputedObj$1 = $(c);
const tmpInitAssignLhsComputedProp$1 = $(`y`);
const tmpInitAssignLhsComputedRhs$1 = $(3);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs$1;
const tmpAnonDefaultExport = tmpInitAssignLhsComputedRhs$1;
export { tmpAnonDefaultExport as default };
$({ a: 999, b: 1000 }, b, c, 3);
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
const g = $( 3 );
e[f] = g;
b[c] = g;
const h = g;
export { h as default };
const i = {
  a: 999,
  b: 1000,
};
$( i, a, d, 3 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
