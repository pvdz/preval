# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident nested member complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
for (; (a = $(b)[$("x")] = $(c)[$("y")] = d); $(1));
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
  const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj /*:unknown*/ = $(c);
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
  $(1);
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
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
  $(1);
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
  e[f] = 3;
  c[d] = 3;
  $( 1 );
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
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 1
 - 6: { x: '3' }
 - 7: 'x'
 - 8: { y: '3' }
 - 9: 'y'
 - 10: 1
 - 11: { x: '3' }
 - 12: 'x'
 - 13: { y: '3' }
 - 14: 'y'
 - 15: 1
 - 16: { x: '3' }
 - 17: 'x'
 - 18: { y: '3' }
 - 19: 'y'
 - 20: 1
 - 21: { x: '3' }
 - 22: 'x'
 - 23: { y: '3' }
 - 24: 'y'
 - 25: 1
 - 26: { x: '3' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
