# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident nested member complex call
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
$(
  (a = $(b)[$("x")] = $(c)[$("y")] = $(d)) ||
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
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(3);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
if (tmpInitAssignLhsComputedRhs) {
  $(tmpInitAssignLhsComputedRhs);
  $(tmpInitAssignLhsComputedRhs, b, c, 3);
} else {
  const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$3 /*:unknown*/ = $(c);
  const tmpInitAssignLhsComputedProp$3 /*:unknown*/ = $(`y`);
  const tmpInitAssignLhsComputedRhs$3 /*:unknown*/ = $(3);
  tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = tmpInitAssignLhsComputedRhs$3;
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$3;
  $(tmpInitAssignLhsComputedRhs$3);
  $(tmpInitAssignLhsComputedRhs$3, b, c, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const c = { y: 2 };
const tmpInitAssignLhsComputedObj = $(c);
const tmpInitAssignLhsComputedProp = $(`y`);
const tmpInitAssignLhsComputedRhs = $(3);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
if (tmpInitAssignLhsComputedRhs) {
  $(tmpInitAssignLhsComputedRhs);
  $(tmpInitAssignLhsComputedRhs, b, c, 3);
} else {
  const tmpInitAssignLhsComputedObj$1 = $(b);
  const tmpInitAssignLhsComputedProp$1 = $(`x`);
  const tmpInitAssignLhsComputedObj$3 = $(c);
  const tmpInitAssignLhsComputedProp$3 = $(`y`);
  const tmpInitAssignLhsComputedRhs$3 = $(3);
  tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = tmpInitAssignLhsComputedRhs$3;
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$3;
  $(tmpInitAssignLhsComputedRhs$3);
  $(tmpInitAssignLhsComputedRhs$3, b, c, 3);
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
  $( g );
  $( g, a, d, 3 );
}
else {
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
 - 6: 3
 - 7: 3, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
