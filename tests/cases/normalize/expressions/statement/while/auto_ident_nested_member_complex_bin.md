# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Statement > While > Auto ident nested member complex bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
while (($(b)[$("x")] = $(c)[$("y")] = d + e)) $(100);
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
const c /*:object*/ /*truthy*/ = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
  const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
  $(100);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
while (true) {
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`x`);
  const tmpInitAssignLhsComputedObj$1 = $(c);
  const tmpInitAssignLhsComputedProp$1 = $(`y`);
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 7;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
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
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`x`);
  const tmpInitAssignLhsComputedObj$1 = $(c);
  const tmpInitAssignLhsComputedProp$1 = $(`y`);
  const tmpInitAssignLhsComputedRhs$1 = d + e;
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
  const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  const tmpIfTest = tmpInitAssignLhsComputedRhs;
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
