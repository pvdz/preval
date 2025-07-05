# Preval test case

# another.md

> Let if while x > Another
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
let loopTest = $LOOP_UNROLLS_LEFT_10;
$(100);
const B = $(b);
const X = $(`x`);
const calt = $(c);
const Y = $(`y`);
const three = $(3);
calt[Y] = three;
B[X] = three;
if (three) {
} else {
  loopTest = false;
}
while (loopTest) {
  $(100);
  const B = $(b);
  const X = $(`x`);
  const C = $(c);
  const Y = $(`y`);
  const T = $(3);
  C[Y] = T;
  B[X] = T;
  if (T) {
  } else {
    break;
  }
}
$(a, b, c, 3);
`````


## Settled


`````js filename=intro
$(100);
const b /*:object*/ /*truthy*/ = { x: 1 };
const B /*:unknown*/ = $(b);
const X /*:unknown*/ = $(`x`);
const c /*:object*/ /*truthy*/ = { y: 2 };
const calt /*:unknown*/ = $(c);
const Y /*:unknown*/ = $(`y`);
const three /*:unknown*/ = $(3);
calt[Y] = three;
B[X] = three;
if (three) {
  $(100);
  const B$1 /*:unknown*/ = $(b);
  const X$1 /*:unknown*/ = $(`x`);
  const C /*:unknown*/ = $(c);
  const Y$1 /*:unknown*/ = $(`y`);
  const T /*:unknown*/ = $(3);
  C[Y$1] = T;
  B$1[X$1] = T;
  if (T) {
    while ($LOOP_UNROLLS_LEFT_10) {
      $(100);
      const B$2 /*:unknown*/ = $(b);
      const X$2 /*:unknown*/ = $(`x`);
      const C$1 /*:unknown*/ = $(c);
      const Y$2 /*:unknown*/ = $(`y`);
      const T$1 /*:unknown*/ = $(3);
      C$1[Y$2] = T$1;
      B$2[X$2] = T$1;
      if (T$1) {
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b, c, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const b = { x: 1 };
const B = $(b);
const X = $(`x`);
const c = { y: 2 };
const calt = $(c);
const Y = $(`y`);
const three = $(3);
calt[Y] = three;
B[X] = three;
if (three) {
  $(100);
  const B$1 = $(b);
  const X$1 = $(`x`);
  const C = $(c);
  const Y$1 = $(`y`);
  const T = $(3);
  C[Y$1] = T;
  B$1[X$1] = T;
  if (T) {
    while (true) {
      $(100);
      const B$2 = $(b);
      const X$2 = $(`x`);
      const C$1 = $(c);
      const Y$2 = $(`y`);
      const T$1 = $(3);
      C$1[Y$2] = T$1;
      B$2[X$2] = T$1;
      if (!T$1) {
        break;
      }
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
  $( 100 );
  const h = $( a );
  const i = $( "x" );
  const j = $( d );
  const k = $( "y" );
  const l = $( 3 );
  j[k] = l;
  h[i] = l;
  if (l) {
    while ($LOOP_UNROLLS_LEFT_10) {
      $( 100 );
      const m = $( a );
      const n = $( "x" );
      const o = $( d );
      const p = $( "y" );
      const q = $( 3 );
      o[p] = q;
      m[n] = q;
      if (q) {

      }
      else {
        break;
      }
    }
  }
}
const r = {
  a: 999,
  b: 1000,
};
$( r, a, d, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
let loopTest = true;
$(100);
const B = $(b);
const X = $(`x`);
const calt = $(c);
const Y = $(`y`);
const three = $(3);
calt[Y] = three;
B[X] = three;
if (three) {
} else {
  loopTest = false;
}
while (true) {
  if (loopTest) {
    $(100);
    const B$1 = $(b);
    const X$1 = $(`x`);
    const C = $(c);
    const Y$1 = $(`y`);
    const T = $(3);
    C[Y$1] = T;
    B$1[X$1] = T;
    if (T) {
    } else {
      break;
    }
  } else {
    break;
  }
}
$(a, b, c, 3);
`````


## Todos triggered


- (todo) Support this ident in isFree CallExpression: $boolean_constructor
- (todo) this implies a bug and we should prevent it; g
- (todo) this implies a bug and we should prevent it; r
- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
