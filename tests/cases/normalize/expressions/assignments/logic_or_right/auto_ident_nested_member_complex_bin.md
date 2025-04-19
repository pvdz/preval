# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident nested member complex bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
$($(100) || (a = $(b)[$("x")] = $(c)[$("y")] = d + e));
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b, c, 3, 4);
} else {
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
  const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
  $(7);
  $(7, b, c, 3, 4);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
const b = { x: 1 };
const c = { y: 2 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, b, c, 3, 4);
} else {
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`x`);
  const tmpInitAssignLhsComputedObj$1 = $(c);
  const tmpInitAssignLhsComputedProp$1 = $(`y`);
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
  $(7);
  $(7, b, c, 3, 4);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { x: 1 };
const c = { y: 2 };
if (a) {
  $( a );
  const d = {
    a: 999,
    b: 1000,
  };
  $( d, b, c, 3, 4 );
}
else {
  const e = $( b );
  const f = $( "x" );
  const g = $( c );
  const h = $( "y" );
  g[h] = 7;
  e[f] = 7;
  $( 7 );
  $( 7, b, c, 3, 4 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, { x: '1' }, { y: '2' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
