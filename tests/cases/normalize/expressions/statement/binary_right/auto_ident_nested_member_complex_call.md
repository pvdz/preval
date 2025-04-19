# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Statement > Binary right > Auto ident nested member complex call
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
$(100) + ($(b)[$("x")] = $(c)[$("y")] = $(d));
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = $(3);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs$1;
tmpBinBothLhs + tmpInitAssignLhsComputedRhs$1;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b, c, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const b = { x: 1 };
const tmpInitAssignLhsComputedObj = $(b);
const tmpInitAssignLhsComputedProp = $(`x`);
const c = { y: 2 };
const tmpInitAssignLhsComputedObj$1 = $(c);
const tmpInitAssignLhsComputedProp$1 = $(`y`);
const tmpInitAssignLhsComputedRhs$1 = $(3);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs$1;
tmpBinBothLhs + tmpInitAssignLhsComputedRhs$1;
$({ a: 999, b: 1000 }, b, c, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { x: 1 };
const c = $( b );
const d = $( "x" );
const e = { y: 2 };
const f = $( e );
const g = $( "y" );
const h = $( 3 );
f[g] = h;
c[d] = h;
a + h;
const i = {
  a: 999,
  b: 1000,
};
$( i, b, e, 3 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 3
 - 7: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
