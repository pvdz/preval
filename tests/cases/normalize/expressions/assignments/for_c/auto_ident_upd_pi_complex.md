# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = ++$($(b)).x);
$(a, b);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(b);
  const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
  const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
  const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
  const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
  tmpUpdObj.x = tmpUpdInc;
  a = tmpUpdInc;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$1 /*:unknown*/ = $(b);
      const tmpUpdObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
      const tmpUpdProp$1 /*:unknown*/ = tmpUpdObj$1.x;
      const tmpUpdNum$1 /*:number*/ = $coerce(tmpUpdProp$1, `number`);
      const tmpUpdInc$1 /*:number*/ = tmpUpdNum$1 + 1;
      tmpUpdObj$1.x = tmpUpdInc$1;
      a = tmpUpdInc$1;
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
const b = { x: 1 };
if (tmpIfTest) {
  const tmpUpdObj = $($(b));
  const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) + 1;
  tmpUpdObj.x = tmpUpdInc;
  a = tmpUpdInc;
  while (true) {
    if ($(1)) {
      const tmpUpdObj$1 = $($(b));
      const tmpUpdInc$1 = $coerce(tmpUpdObj$1.x, `number`) + 1;
      tmpUpdObj$1.x = tmpUpdInc$1;
      a = tmpUpdInc$1;
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = ++$($(b)).x;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCalleeParam = $(b);
    let tmpUpdObj = $(tmpCalleeParam);
    let tmpUpdProp = tmpUpdObj.x;
    let tmpUpdNum = $coerce(tmpUpdProp, `number`);
    let tmpUpdInc = tmpUpdNum + 1;
    tmpUpdObj.x = tmpUpdInc;
    a = tmpUpdInc;
  } else {
    break;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
const c = { x: 1 };
if (b) {
  const d = $( c );
  const e = $( d );
  const f = e.x;
  const g = $coerce( f, "number" );
  const h = g + 1;
  e.x = h;
  a = h;
  while ($LOOP_UNROLL_10) {
    const i = $( 1 );
    if (i) {
      const j = $( c );
      const k = $( j );
      const l = k.x;
      const m = $coerce( l, "number" );
      const n = m + 1;
      k.x = n;
      a = n;
    }
    else {
      break;
    }
  }
}
$( a, c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 1
 - 5: { x: '2' }
 - 6: { x: '2' }
 - 7: 1
 - 8: { x: '3' }
 - 9: { x: '3' }
 - 10: 1
 - 11: { x: '4' }
 - 12: { x: '4' }
 - 13: 1
 - 14: { x: '5' }
 - 15: { x: '5' }
 - 16: 1
 - 17: { x: '6' }
 - 18: { x: '6' }
 - 19: 1
 - 20: { x: '7' }
 - 21: { x: '7' }
 - 22: 1
 - 23: { x: '8' }
 - 24: { x: '8' }
 - 25: 1
 - 26: { x: '9' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check