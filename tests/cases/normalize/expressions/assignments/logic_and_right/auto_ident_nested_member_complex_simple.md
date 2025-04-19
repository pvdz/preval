# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident nested member complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
$($(100) && (a = $(b)[$("x")] = $(c)[$("y")] = d));
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
if (tmpCalleeParam) {
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
  const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
  $(3);
  $(3, b, c, 3);
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b, c, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
const b = { x: 1 };
const c = { y: 2 };
if (tmpCalleeParam) {
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`x`);
  const tmpInitAssignLhsComputedObj$1 = $(c);
  const tmpInitAssignLhsComputedProp$1 = $(`y`);
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
  $(3);
  $(3, b, c, 3);
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, b, c, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { x: 1 };
const c = { y: 2 };
if (a) {
  const d = $( b );
  const e = $( "x" );
  const f = $( c );
  const g = $( "y" );
  f[g] = 3;
  d[e] = 3;
  $( 3 );
  $( 3, b, c, 3 );
}
else {
  $( a );
  const h = {
    a: 999,
    b: 1000,
  };
  $( h, b, c, 3 );
}
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
 - 7: 3, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
