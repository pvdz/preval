# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Assignments > For let > Auto ident nested member complex bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
for (let xyz = (a = $(b)[$("x")] = $(c)[$("y")] = d + e); ; $(1)) $(xyz);
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(7);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignComMemberObj = $({ x: 1 });
const tmpNestedAssignComMemberProp = $(`x`);
const tmpInitAssignLhsComputedObj = $({ y: 2 });
const tmpInitAssignLhsComputedProp = $(`y`);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
while (true) {
  $(7);
  $(1);
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
e[f] = 7;
b[c] = 7;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 7 );
  $( 1 );
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
 - 5: 7
 - 6: 1
 - 7: 7
 - 8: 1
 - 9: 7
 - 10: 1
 - 11: 7
 - 12: 1
 - 13: 7
 - 14: 1
 - 15: 7
 - 16: 1
 - 17: 7
 - 18: 1
 - 19: 7
 - 20: 1
 - 21: 7
 - 22: 1
 - 23: 7
 - 24: 1
 - 25: 7
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
