# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident nested member complex call
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
$(
  (a = $(b)[$("x")] = $(c)[$("y")] = $(d)) &&
    (a = $(b)[$("x")] = $(c)[$("y")] = $(d))
);
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(c);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
const varInitAssignLhsComputedRhs /*:unknown*/ = $(3);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$3 /*:unknown*/ = $(c);
  const varInitAssignLhsComputedProp$3 /*:unknown*/ = $(`y`);
  const varInitAssignLhsComputedRhs$3 /*:unknown*/ = $(3);
  varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$3;
  $(varInitAssignLhsComputedRhs$3);
  $(varInitAssignLhsComputedRhs$3, b, c, 3);
} else {
  $(varInitAssignLhsComputedRhs);
  $(varInitAssignLhsComputedRhs, b, c, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const c = { y: 2 };
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedProp = $(`y`);
const varInitAssignLhsComputedRhs = $(3);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  const varInitAssignLhsComputedObj$1 = $(b);
  const varInitAssignLhsComputedProp$1 = $(`x`);
  const varInitAssignLhsComputedObj$3 = $(c);
  const varInitAssignLhsComputedProp$3 = $(`y`);
  const varInitAssignLhsComputedRhs$3 = $(3);
  varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$3;
  $(varInitAssignLhsComputedRhs$3);
  $(varInitAssignLhsComputedRhs$3, b, c, 3);
} else {
  $(varInitAssignLhsComputedRhs);
  $(varInitAssignLhsComputedRhs, b, c, 3);
}
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
if (g) {
  const h = $( a );
  const i = $( "x" );
  const j = $( d );
  const k = $( "y" );
  const l = $( 3 );
  j[k] = l;
  h[i] = l;
  $( l );
  $( l, a, d, 3 );
}
else {
  $( g );
  $( g, a, d, 3 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 3
 - 6: { x: '3' }
 - 7: 'x'
 - 8: { y: '3' }
 - 9: 'y'
 - 10: 3
 - 11: 3
 - 12: 3, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
