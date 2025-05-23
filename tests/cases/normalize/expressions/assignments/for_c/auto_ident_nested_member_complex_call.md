# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Assignments > For c > Auto ident nested member complex call
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)[$("x")] = $(c)[$("y")] = $(d));
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
if (tmpIfTest) {
  const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
  const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(c);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
  const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(3);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
  let tmpClusterSSA_a /*:unknown*/ = tmpInitAssignLhsComputedRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpNestedAssignComMemberObj$1 /*:unknown*/ = $(b);
      const tmpNestedAssignComMemberProp$1 /*:unknown*/ = $(`x`);
      const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
      const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
      const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = $(3);
      tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
      tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpInitAssignLhsComputedRhs$1;
      tmpClusterSSA_a = tmpInitAssignLhsComputedRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, b, c, 3);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b, c, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { x: 1 };
const c = { y: 2 };
if (tmpIfTest) {
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $(`x`);
  const tmpInitAssignLhsComputedObj = $(c);
  const tmpInitAssignLhsComputedProp = $(`y`);
  const tmpInitAssignLhsComputedRhs = $(3);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
  let tmpClusterSSA_a = tmpInitAssignLhsComputedRhs;
  while (true) {
    if ($(1)) {
      const tmpNestedAssignComMemberObj$1 = $(b);
      const tmpNestedAssignComMemberProp$1 = $(`x`);
      const tmpInitAssignLhsComputedObj$1 = $(c);
      const tmpInitAssignLhsComputedProp$1 = $(`y`);
      const tmpInitAssignLhsComputedRhs$1 = $(3);
      tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
      tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpInitAssignLhsComputedRhs$1;
      tmpClusterSSA_a = tmpInitAssignLhsComputedRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, b, c, 3);
} else {
  $({ a: 999, b: 1000 }, b, c, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: 1 };
const c = { y: 2 };
if (a) {
  const d = $( b );
  const e = $( "x" );
  const f = $( c );
  const g = $( "y" );
  const h = $( 3 );
  f[g] = h;
  d[e] = h;
  let i = h;
  while ($LOOP_UNROLL_10) {
    const j = $( 1 );
    if (j) {
      const k = $( b );
      const l = $( "x" );
      const m = $( c );
      const n = $( "y" );
      const o = $( 3 );
      m[n] = o;
      k[l] = o;
      i = o;
    }
    else {
      break;
    }
  }
  $( i, b, c, 3 );
}
else {
  const p = {
    a: 999,
    b: 1000,
  };
  $( p, b, c, 3 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
    const tmpInitAssignLhsComputedObj = $(c);
    const tmpInitAssignLhsComputedProp = $(`y`);
    const tmpInitAssignLhsComputedRhs = $(d);
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = tmpInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
  } else {
    break;
  }
}
$(a, b, c, d);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 3
 - 7: 1
 - 8: { x: '3' }
 - 9: 'x'
 - 10: { y: '3' }
 - 11: 'y'
 - 12: 3
 - 13: 1
 - 14: { x: '3' }
 - 15: 'x'
 - 16: { y: '3' }
 - 17: 'y'
 - 18: 3
 - 19: 1
 - 20: { x: '3' }
 - 21: 'x'
 - 22: { y: '3' }
 - 23: 'y'
 - 24: 3
 - 25: 1
 - 26: { x: '3' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
