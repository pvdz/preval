# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Assignments > While > Auto ident nested member complex bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
while ((a = $(b)[$("x")] = $(c)[$("y")] = d + e)) $(100);
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
const c /*:object*/ /*truthy*/ = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
  const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(c);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
  $(100);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
while (true) {
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $(`x`);
  const tmpInitAssignLhsComputedObj = $(c);
  const tmpInitAssignLhsComputedProp = $(`y`);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
  $(100);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = $( a );
  const d = $( "x" );
  const e = $( b );
  const f = $( "y" );
  e[f] = 7;
  c[d] = 7;
  $( 100 );
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
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
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
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 100
 - 6: { x: '7' }
 - 7: 'x'
 - 8: { y: '7' }
 - 9: 'y'
 - 10: 100
 - 11: { x: '7' }
 - 12: 'x'
 - 13: { y: '7' }
 - 14: 'y'
 - 15: 100
 - 16: { x: '7' }
 - 17: 'x'
 - 18: { y: '7' }
 - 19: 'y'
 - 20: 100
 - 21: { x: '7' }
 - 22: 'x'
 - 23: { y: '7' }
 - 24: 'y'
 - 25: 100
 - 26: { x: '7' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
