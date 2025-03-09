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
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
  const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$3 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$3 /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$5 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$5 /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$7 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$7 /*:unknown*/ = $(`x`);
  varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
  varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
  varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpAssignComMemLhsObj$1 /*:unknown*/ = $(b);
      const tmpAssignComMemLhsProp$1 /*:unknown*/ = $(`x`);
      const varInitAssignLhsComputedObj$2 /*:unknown*/ = $(b);
      const varInitAssignLhsComputedProp$2 /*:unknown*/ = $(`x`);
      const varInitAssignLhsComputedObj$4 /*:unknown*/ = $(b);
      const varInitAssignLhsComputedProp$4 /*:unknown*/ = $(`x`);
      const varInitAssignLhsComputedObj$6 /*:unknown*/ = $(b);
      const varInitAssignLhsComputedProp$6 /*:unknown*/ = $(`x`);
      const varInitAssignLhsComputedObj$8 /*:unknown*/ = $(b);
      const varInitAssignLhsComputedProp$8 /*:unknown*/ = $(`x`);
      const varInitAssignLhsComputedObj$10 /*:unknown*/ = $(b);
      const varInitAssignLhsComputedProp$10 /*:unknown*/ = $(`x`);
      varInitAssignLhsComputedObj$10[varInitAssignLhsComputedProp$10] = 3;
      varInitAssignLhsComputedObj$8[varInitAssignLhsComputedProp$8] = 3;
      varInitAssignLhsComputedObj$6[varInitAssignLhsComputedProp$6] = 3;
      varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = 3;
      varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = 3;
      tmpAssignComMemLhsObj$1[tmpAssignComMemLhsProp$1] = 3;
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
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
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(b);
  const varInitAssignLhsComputedProp$1 = $(`x`);
  const varInitAssignLhsComputedObj$3 = $(b);
  const varInitAssignLhsComputedProp$3 = $(`x`);
  const varInitAssignLhsComputedObj$5 = $(b);
  const varInitAssignLhsComputedProp$5 = $(`x`);
  const varInitAssignLhsComputedObj$7 = $(b);
  const varInitAssignLhsComputedProp$7 = $(`x`);
  varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
  varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
  varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3;
  while (true) {
    if ($(1)) {
      const tmpAssignComMemLhsObj$1 = $(b);
      const tmpAssignComMemLhsProp$1 = $(`x`);
      const varInitAssignLhsComputedObj$2 = $(b);
      const varInitAssignLhsComputedProp$2 = $(`x`);
      const varInitAssignLhsComputedObj$4 = $(b);
      const varInitAssignLhsComputedProp$4 = $(`x`);
      const varInitAssignLhsComputedObj$6 = $(b);
      const varInitAssignLhsComputedProp$6 = $(`x`);
      const varInitAssignLhsComputedObj$8 = $(b);
      const varInitAssignLhsComputedProp$8 = $(`x`);
      const varInitAssignLhsComputedObj$10 = $(b);
      const varInitAssignLhsComputedProp$10 = $(`x`);
      varInitAssignLhsComputedObj$10[varInitAssignLhsComputedProp$10] = 3;
      varInitAssignLhsComputedObj$8[varInitAssignLhsComputedProp$8] = 3;
      varInitAssignLhsComputedObj$6[varInitAssignLhsComputedProp$6] = 3;
      varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = 3;
      varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = 3;
      tmpAssignComMemLhsObj$1[tmpAssignComMemLhsProp$1] = 3;
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b, 3);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = c;
  }
}
$(a, b, c);
`````

## Normalized


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
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedProp = $(`x`);
    const varInitAssignLhsComputedObj$1 = $(b);
    const varInitAssignLhsComputedProp$1 = $(`x`);
    const varInitAssignLhsComputedObj$3 = $(b);
    const varInitAssignLhsComputedProp$3 = $(`x`);
    const varInitAssignLhsComputedObj$5 = $(b);
    const varInitAssignLhsComputedProp$5 = $(`x`);
    const varInitAssignLhsComputedObj$7 = $(b);
    const varInitAssignLhsComputedProp$7 = $(`x`);
    const varInitAssignLhsComputedRhs$7 = c;
    varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = varInitAssignLhsComputedRhs$7;
    const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
    varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$5;
    const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
    varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
    const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpAssignComputedRhs = varInitAssignLhsComputedRhs;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  } else {
    break;
  }
}
$(a, b, c);
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

Todos triggered:
- objects in isFree check
