# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Assignments > For c > Auto ident nested member complex bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)[$("x")] = $(c)[$("y")] = d + e);
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ /*truthy*/ = { x: 1 };
const c /*:object*/ /*truthy*/ = { y: 2 };
if (tmpIfTest) {
  const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
  const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(c);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpNestedAssignComMemberObj$1 /*:unknown*/ = $(b);
      const tmpNestedAssignComMemberProp$1 /*:unknown*/ = $(`x`);
      const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
      const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
      tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
      tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = 7;
    } else {
      break;
    }
  }
  $(7, b, c, 3, 4);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a, b, c, 3, 4);
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
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
  while (true) {
    if ($(1)) {
      const tmpNestedAssignComMemberObj$1 = $(b);
      const tmpNestedAssignComMemberProp$1 = $(`x`);
      const tmpInitAssignLhsComputedObj$1 = $(c);
      const tmpInitAssignLhsComputedProp$1 = $(`y`);
      tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
      tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = 7;
    } else {
      break;
    }
  }
  $(7, b, c, 3, 4);
} else {
  $({ a: 999, b: 1000 }, b, c, 3, 4);
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
  f[g] = 7;
  d[e] = 7;
  while ($LOOP_UNROLLS_LEFT_10) {
    const h = $( 1 );
    if (h) {
      const i = $( b );
      const j = $( "x" );
      const k = $( c );
      const l = $( "y" );
      k[l] = 7;
      i[j] = 7;
    }
    else {
      break;
    }
  }
  $( 7, b, c, 3, 4 );
}
else {
  const m = {
    a: 999,
    b: 1000,
  };
  $( m, b, c, 3, 4 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
    const tmpInitAssignLhsComputedObj = $(c);
    const tmpInitAssignLhsComputedProp = $(`y`);
    const tmpInitAssignLhsComputedRhs = d + e;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = tmpInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
  } else {
    break;
  }
}
$(a, b, c, d, e);
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
 - 6: 1
 - 7: { x: '7' }
 - 8: 'x'
 - 9: { y: '7' }
 - 10: 'y'
 - 11: 1
 - 12: { x: '7' }
 - 13: 'x'
 - 14: { y: '7' }
 - 15: 'y'
 - 16: 1
 - 17: { x: '7' }
 - 18: 'x'
 - 19: { y: '7' }
 - 20: 'y'
 - 21: 1
 - 22: { x: '7' }
 - 23: 'x'
 - 24: { y: '7' }
 - 25: 'y'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
