# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Statement > Do while > Auto ident nested member complex call
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (($(b)[$("x")] = $(c)[$("y")] = $(d)));
$(a, b, c, d);
`````


## Settled


`````js filename=intro
$(100);
const b /*:object*/ = { x: 1 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = $(3);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs$1;
if (tmpInitAssignLhsComputedRhs$1) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpInitAssignLhsComputedObj$2 /*:unknown*/ = $(b);
    const tmpInitAssignLhsComputedProp$2 /*:unknown*/ = $(`x`);
    const tmpInitAssignLhsComputedObj$4 /*:unknown*/ = $(c);
    const tmpInitAssignLhsComputedProp$4 /*:unknown*/ = $(`y`);
    const tmpInitAssignLhsComputedRhs$2 /*:unknown*/ = $(3);
    tmpInitAssignLhsComputedObj$4[tmpInitAssignLhsComputedProp$4] = tmpInitAssignLhsComputedRhs$2;
    tmpInitAssignLhsComputedObj$2[tmpInitAssignLhsComputedProp$2] = tmpInitAssignLhsComputedRhs$2;
    if (tmpInitAssignLhsComputedRhs$2) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b, c, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const b = { x: 1 };
const tmpInitAssignLhsComputedObj = $(b);
const tmpInitAssignLhsComputedProp = $(`x`);
const c = { y: 2 };
const tmpInitAssignLhsComputedObj$1 = $(c);
const tmpInitAssignLhsComputedProp$1 = $(`y`);
const tmpInitAssignLhsComputedRhs$1 = $(3);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs$1;
if (tmpInitAssignLhsComputedRhs$1) {
  while (true) {
    $(100);
    const tmpInitAssignLhsComputedObj$2 = $(b);
    const tmpInitAssignLhsComputedProp$2 = $(`x`);
    const tmpInitAssignLhsComputedObj$4 = $(c);
    const tmpInitAssignLhsComputedProp$4 = $(`y`);
    const tmpInitAssignLhsComputedRhs$2 = $(3);
    tmpInitAssignLhsComputedObj$4[tmpInitAssignLhsComputedProp$4] = tmpInitAssignLhsComputedRhs$2;
    tmpInitAssignLhsComputedObj$2[tmpInitAssignLhsComputedProp$2] = tmpInitAssignLhsComputedRhs$2;
    if (!tmpInitAssignLhsComputedRhs$2) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b, c, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
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
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const h = $( a );
    const i = $( "x" );
    const j = $( d );
    const k = $( "y" );
    const l = $( 3 );
    j[k] = l;
    h[i] = l;
    if (l) {

    }
    else {
      break;
    }
  }
}
const m = {
  a: 999,
  b: 1000,
};
$( m, a, d, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`x`);
  const tmpInitAssignLhsComputedObj$1 = $(c);
  const tmpInitAssignLhsComputedProp$1 = $(`y`);
  const tmpInitAssignLhsComputedRhs$1 = $(d);
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
  const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  const tmpIfTest = tmpInitAssignLhsComputedRhs;
  if (tmpIfTest) {
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
 - 1: 100
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 3
 - 7: 100
 - 8: { x: '3' }
 - 9: 'x'
 - 10: { y: '3' }
 - 11: 'y'
 - 12: 3
 - 13: 100
 - 14: { x: '3' }
 - 15: 'x'
 - 16: { y: '3' }
 - 17: 'y'
 - 18: 3
 - 19: 100
 - 20: { x: '3' }
 - 21: 'x'
 - 22: { y: '3' }
 - 23: 'y'
 - 24: 3
 - 25: 100
 - 26: { x: '3' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
