# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > While > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
while (
  ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(
    b
  )[$("x")] = c)
)
  $(100);
$(a, b, c);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$3 /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp$3 /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$5 /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp$5 /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$7 /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp$7 /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$9 /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp$9 /*:unknown*/ = $(`x`);
  tmpInitAssignLhsComputedObj$9[tmpInitAssignLhsComputedProp$9] = 3;
  tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
  tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
  tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
  $(100);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
while (true) {
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`x`);
  const tmpInitAssignLhsComputedObj$1 = $(b);
  const tmpInitAssignLhsComputedProp$1 = $(`x`);
  const tmpInitAssignLhsComputedObj$3 = $(b);
  const tmpInitAssignLhsComputedProp$3 = $(`x`);
  const tmpInitAssignLhsComputedObj$5 = $(b);
  const tmpInitAssignLhsComputedProp$5 = $(`x`);
  const tmpInitAssignLhsComputedObj$7 = $(b);
  const tmpInitAssignLhsComputedProp$7 = $(`x`);
  const tmpInitAssignLhsComputedObj$9 = $(b);
  const tmpInitAssignLhsComputedProp$9 = $(`x`);
  tmpInitAssignLhsComputedObj$9[tmpInitAssignLhsComputedProp$9] = 3;
  tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
  tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
  tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
  $(100);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
while ($LOOP_NO_UNROLLS_LEFT) {
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`x`);
  const tmpInitAssignLhsComputedObj$1 = $(b);
  const tmpInitAssignLhsComputedProp$1 = $(`x`);
  const tmpInitAssignLhsComputedObj$3 = $(b);
  const tmpInitAssignLhsComputedProp$3 = $(`x`);
  const tmpInitAssignLhsComputedObj$5 = $(b);
  const tmpInitAssignLhsComputedProp$5 = $(`x`);
  const tmpInitAssignLhsComputedObj$7 = $(b);
  const tmpInitAssignLhsComputedProp$7 = $(`x`);
  const tmpInitAssignLhsComputedObj$9 = $(b);
  const tmpInitAssignLhsComputedProp$9 = $(`x`);
  const tmpInitAssignLhsComputedRhs$9 = c;
  tmpInitAssignLhsComputedObj$9[tmpInitAssignLhsComputedProp$9] = tmpInitAssignLhsComputedRhs$9;
  const tmpInitAssignLhsComputedRhs$7 = tmpInitAssignLhsComputedRhs$9;
  tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = tmpInitAssignLhsComputedRhs$7;
  const tmpInitAssignLhsComputedRhs$5 = tmpInitAssignLhsComputedRhs$7;
  tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = tmpInitAssignLhsComputedRhs$5;
  const tmpInitAssignLhsComputedRhs$3 = tmpInitAssignLhsComputedRhs$5;
  tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = tmpInitAssignLhsComputedRhs$3;
  const tmpInitAssignLhsComputedRhs$1 = tmpInitAssignLhsComputedRhs$3;
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
$(a, b, c);
`````


## Todos triggered


- (todo) objects in isFree check


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
