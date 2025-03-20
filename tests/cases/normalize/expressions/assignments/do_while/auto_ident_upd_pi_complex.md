# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = ++$($(b)).x));
$(a, b);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
$(100);
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdInc) {
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
let a = undefined;
$(100);
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) + 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdInc) {
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
let a = undefined;
$( 100 );
const b = { x: 1 };
const c = $( b );
const d = $( c );
const e = d.x;
const f = $coerce( e, "number" );
const g = f + 1;
d.x = g;
if (g) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const h = $( b );
    const i = $( h );
    const j = i.x;
    const k = $coerce( j, "number" );
    const l = k + 1;
    i.x = l;
    a = l;
    if (l) {

    }
    else {
      break;
    }
  }
  $( a, b );
}
else {
  $( g, b );
}
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 100
 - 5: { x: '2' }
 - 6: { x: '2' }
 - 7: 100
 - 8: { x: '3' }
 - 9: { x: '3' }
 - 10: 100
 - 11: { x: '4' }
 - 12: { x: '4' }
 - 13: 100
 - 14: { x: '5' }
 - 15: { x: '5' }
 - 16: 100
 - 17: { x: '6' }
 - 18: { x: '6' }
 - 19: 100
 - 20: { x: '7' }
 - 21: { x: '7' }
 - 22: 100
 - 23: { x: '8' }
 - 24: { x: '8' }
 - 25: 100
 - 26: { x: '9' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
