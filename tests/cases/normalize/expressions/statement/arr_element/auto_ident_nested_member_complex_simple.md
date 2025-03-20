# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident nested member complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
($(b)[$("x")] = $(c)[$("y")] = d) + ($(b)[$("x")] = $(c)[$("y")] = d);
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
const varInitAssignLhsComputedObj$3 /*:unknown*/ = $(b);
const varInitAssignLhsComputedProp$3 /*:unknown*/ = $(`x`);
const varInitAssignLhsComputedObj$5 /*:unknown*/ = $(c);
const varInitAssignLhsComputedProp$5 /*:unknown*/ = $(`y`);
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b, c, 3);
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
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
const varInitAssignLhsComputedObj$3 = $(b);
const varInitAssignLhsComputedProp$3 = $(`x`);
const varInitAssignLhsComputedObj$5 = $(c);
const varInitAssignLhsComputedProp$5 = $(`y`);
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
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
e[f] = 3;
b[c] = 3;
const g = $( a );
const h = $( "x" );
const i = $( d );
const j = $( "y" );
i[j] = 3;
g[h] = 3;
const k = {
  a: 999,
  b: 1000,
};
$( k, a, d, 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: { x: '3' }
 - 6: 'x'
 - 7: { y: '3' }
 - 8: 'y'
 - 9: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
