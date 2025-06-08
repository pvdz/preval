# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > For c > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for (
  ;
  $(1);
  $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(
    b
  )[$("x")] = c
);
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ /*truthy*/ = { x: 1 };
if (tmpIfTest) {
  const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`x`);
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
  tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
  tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
  tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpAssignComMemLhsObj$1 /*:unknown*/ = $(b);
      const tmpAssignComMemLhsProp$1 /*:unknown*/ = $(`x`);
      const tmpInitAssignLhsComputedObj$2 /*:unknown*/ = $(b);
      const tmpInitAssignLhsComputedProp$2 /*:unknown*/ = $(`x`);
      const tmpInitAssignLhsComputedObj$4 /*:unknown*/ = $(b);
      const tmpInitAssignLhsComputedProp$4 /*:unknown*/ = $(`x`);
      const tmpInitAssignLhsComputedObj$6 /*:unknown*/ = $(b);
      const tmpInitAssignLhsComputedProp$6 /*:unknown*/ = $(`x`);
      const tmpInitAssignLhsComputedObj$8 /*:unknown*/ = $(b);
      const tmpInitAssignLhsComputedProp$8 /*:unknown*/ = $(`x`);
      const tmpInitAssignLhsComputedObj$10 /*:unknown*/ = $(b);
      const tmpInitAssignLhsComputedProp$10 /*:unknown*/ = $(`x`);
      tmpInitAssignLhsComputedObj$10[tmpInitAssignLhsComputedProp$10] = 3;
      tmpInitAssignLhsComputedObj$8[tmpInitAssignLhsComputedProp$8] = 3;
      tmpInitAssignLhsComputedObj$6[tmpInitAssignLhsComputedProp$6] = 3;
      tmpInitAssignLhsComputedObj$4[tmpInitAssignLhsComputedProp$4] = 3;
      tmpInitAssignLhsComputedObj$2[tmpInitAssignLhsComputedProp$2] = 3;
      tmpAssignComMemLhsObj$1[tmpAssignComMemLhsProp$1] = 3;
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { x: 1 };
if (tmpIfTest) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
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
  tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
  tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
  tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3;
  while (true) {
    if ($(1)) {
      const tmpAssignComMemLhsObj$1 = $(b);
      const tmpAssignComMemLhsProp$1 = $(`x`);
      const tmpInitAssignLhsComputedObj$2 = $(b);
      const tmpInitAssignLhsComputedProp$2 = $(`x`);
      const tmpInitAssignLhsComputedObj$4 = $(b);
      const tmpInitAssignLhsComputedProp$4 = $(`x`);
      const tmpInitAssignLhsComputedObj$6 = $(b);
      const tmpInitAssignLhsComputedProp$6 = $(`x`);
      const tmpInitAssignLhsComputedObj$8 = $(b);
      const tmpInitAssignLhsComputedProp$8 = $(`x`);
      const tmpInitAssignLhsComputedObj$10 = $(b);
      const tmpInitAssignLhsComputedProp$10 = $(`x`);
      tmpInitAssignLhsComputedObj$10[tmpInitAssignLhsComputedProp$10] = 3;
      tmpInitAssignLhsComputedObj$8[tmpInitAssignLhsComputedProp$8] = 3;
      tmpInitAssignLhsComputedObj$6[tmpInitAssignLhsComputedProp$6] = 3;
      tmpInitAssignLhsComputedObj$4[tmpInitAssignLhsComputedProp$4] = 3;
      tmpInitAssignLhsComputedObj$2[tmpInitAssignLhsComputedProp$2] = 3;
      tmpAssignComMemLhsObj$1[tmpAssignComMemLhsProp$1] = 3;
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: 1 };
if (a) {
  const c = $( b );
  const d = $( "x" );
  const e = $( b );
  const f = $( "x" );
  const g = $( b );
  const h = $( "x" );
  const i = $( b );
  const j = $( "x" );
  const k = $( b );
  const l = $( "x" );
  const m = $( b );
  const n = $( "x" );
  m[n] = 3;
  k[l] = 3;
  i[j] = 3;
  g[h] = 3;
  e[f] = 3;
  c[d] = 3;
  while ($LOOP_UNROLL_10) {
    const o = $( 1 );
    if (o) {
      const p = $( b );
      const q = $( "x" );
      const r = $( b );
      const s = $( "x" );
      const t = $( b );
      const u = $( "x" );
      const v = $( b );
      const w = $( "x" );
      const x = $( b );
      const y = $( "x" );
      const z = $( b );
      const ba = $( "x" );
      z[ba] = 3;
      x[y] = 3;
      v[w] = 3;
      t[u] = 3;
      r[s] = 3;
      p[q] = 3;
    }
    else {
      break;
    }
  }
}
const bb = {
  a: 999,
  b: 1000,
};
$( bb, b, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpAssignComMemLhsObj = $(b);
    const tmpAssignComMemLhsProp = $(`x`);
    const tmpAssignComputedObj = tmpAssignComMemLhsObj;
    const tmpAssignComputedProp = tmpAssignComMemLhsProp;
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
    const tmpInitAssignLhsComputedRhs$7 = c;
    tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = tmpInitAssignLhsComputedRhs$7;
    const tmpInitAssignLhsComputedRhs$5 = tmpInitAssignLhsComputedRhs$7;
    tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = tmpInitAssignLhsComputedRhs$5;
    const tmpInitAssignLhsComputedRhs$3 = tmpInitAssignLhsComputedRhs$5;
    tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = tmpInitAssignLhsComputedRhs$3;
    const tmpInitAssignLhsComputedRhs$1 = tmpInitAssignLhsComputedRhs$3;
    tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
    const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
    tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
    const tmpAssignComputedRhs = tmpInitAssignLhsComputedRhs;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
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
 - 1: 1
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { x: '1' }
 - 5: 'x'
 - 6: { x: '1' }
 - 7: 'x'
 - 8: { x: '1' }
 - 9: 'x'
 - 10: { x: '1' }
 - 11: 'x'
 - 12: { x: '1' }
 - 13: 'x'
 - 14: 1
 - 15: { x: '3' }
 - 16: 'x'
 - 17: { x: '3' }
 - 18: 'x'
 - 19: { x: '3' }
 - 20: 'x'
 - 21: { x: '3' }
 - 22: 'x'
 - 23: { x: '3' }
 - 24: 'x'
 - 25: { x: '3' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
