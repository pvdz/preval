# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > While > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while ((a = ++$($(b)).x)) $(100);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdInc) {
  let a /*:unknown*/ = undefined;
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 /*:unknown*/ = $(b);
    const tmpUpdObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
    const tmpUpdProp$1 /*:unknown*/ = tmpUpdObj$1.x;
    const tmpUpdNum$1 /*:number*/ = $coerce(tmpUpdProp$1, `number`);
    const tmpUpdInc$1 /*:number*/ = tmpUpdNum$1 + 1;
    tmpUpdObj$1.x = tmpUpdInc$1;
    a = tmpUpdInc$1;
    if (tmpUpdInc$1) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpUpdInc, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) + 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdInc) {
  let a = undefined;
  while (true) {
    $(100);
    const tmpUpdObj$1 = $($(b));
    const tmpUpdInc$1 = $coerce(tmpUpdObj$1.x, `number`) + 1;
    tmpUpdObj$1.x = tmpUpdInc$1;
    a = tmpUpdInc$1;
    if (!tmpUpdInc$1) {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpUpdInc, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e + 1;
c.x = f;
if (f) {
  let g = undefined;
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const h = $( a );
    const i = $( h );
    const j = i.x;
    const k = $coerce( j, "number" );
    const l = k + 1;
    i.x = l;
    g = l;
    if (l) {

    }
    else {
      break;
    }
  }
  $( g, a );
}
else {
  $( f, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpCalleeParam = $(b);
  const tmpUpdObj = $(tmpCalleeParam);
  const tmpUpdProp = tmpUpdObj.x;
  const tmpUpdNum = $coerce(tmpUpdProp, `number`);
  const tmpUpdInc = tmpUpdNum + 1;
  tmpUpdObj.x = tmpUpdInc;
  a = tmpUpdInc;
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 100
 - 4: { x: '2' }
 - 5: { x: '2' }
 - 6: 100
 - 7: { x: '3' }
 - 8: { x: '3' }
 - 9: 100
 - 10: { x: '4' }
 - 11: { x: '4' }
 - 12: 100
 - 13: { x: '5' }
 - 14: { x: '5' }
 - 15: 100
 - 16: { x: '6' }
 - 17: { x: '6' }
 - 18: 100
 - 19: { x: '7' }
 - 20: { x: '7' }
 - 21: 100
 - 22: { x: '8' }
 - 23: { x: '8' }
 - 24: 100
 - 25: { x: '9' }
 - 26: { x: '9' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
