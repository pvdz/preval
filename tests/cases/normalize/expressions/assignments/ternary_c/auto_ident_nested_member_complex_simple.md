# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident nested member complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $(b)[$("x")] = $(c)[$("y")] = d));
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b, c, 3);
} else {
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
  const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
  $(3);
  $(3, b, c, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const b = { x: 1 };
const c = { y: 2 };
if (tmpIfTest) {
  $($(100));
  $({ a: 999, b: 1000 }, b, c, 3);
} else {
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`x`);
  const tmpInitAssignLhsComputedObj$1 = $(c);
  const tmpInitAssignLhsComputedProp$1 = $(`y`);
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
  $(3);
  $(3, b, c, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = { x: 1 };
const c = { y: 2 };
if (a) {
  const d = $( 100 );
  $( d );
  const e = {
    a: 999,
    b: 1000,
  };
  $( e, b, c, 3 );
}
else {
  const f = $( b );
  const g = $( "x" );
  const h = $( c );
  const i = $( "y" );
  h[i] = 3;
  f[g] = 3;
  $( 3 );
  $( 3, b, c, 3 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
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
