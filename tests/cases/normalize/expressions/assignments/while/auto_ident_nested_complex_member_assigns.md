# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Assignments > While > Auto ident nested complex member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
while (
  (a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
    $("x")
  ] = $(b)[$("x")] = c)
)
  $(100);
$(a, b, c);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
  const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$3 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$3 /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$5 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$5 /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$7 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$7 /*:unknown*/ = $(`x`);
  varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
  varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
  varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
  $(100);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
while (true) {
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $(`x`);
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(b);
  const varInitAssignLhsComputedProp$1 = $(`x`);
  const varInitAssignLhsComputedObj$3 = $(b);
  const varInitAssignLhsComputedProp$3 = $(`x`);
  const varInitAssignLhsComputedObj$5 = $(b);
  const varInitAssignLhsComputedProp$5 = $(`x`);
  const varInitAssignLhsComputedObj$7 = $(b);
  const varInitAssignLhsComputedProp$7 = $(`x`);
  varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
  varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
  varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
  $(100);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = $( a );
  const c = $( "x" );
  const d = $( a );
  const e = $( "x" );
  const f = $( a );
  const g = $( "x" );
  const h = $( a );
  const i = $( "x" );
  const j = $( a );
  const k = $( "x" );
  const l = $( a );
  const m = $( "x" );
  l[m] = 3;
  j[k] = 3;
  h[i] = 3;
  f[g] = 3;
  d[e] = 3;
  b[c] = 3;
  $( 100 );
}
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { x: '1' }
 - 6: 'x'
 - 7: { x: '1' }
 - 8: 'x'
 - 9: { x: '1' }
 - 10: 'x'
 - 11: { x: '1' }
 - 12: 'x'
 - 13: 100
 - 14: { x: '3' }
 - 15: 'x'
 - 16: { x: '3' }
 - 17: 'x'
 - 18: { x: '3' }
 - 19: 'x'
 - 20: { x: '3' }
 - 21: 'x'
 - 22: { x: '3' }
 - 23: 'x'
 - 24: { x: '3' }
 - 25: 'x'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
