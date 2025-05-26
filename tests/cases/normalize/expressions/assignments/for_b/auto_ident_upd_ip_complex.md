# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident upd ip complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; (a = $($(b)).x++); $(1));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdNum) {
  let a /*:unknown*/ = undefined;
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpCalleeParam$1 /*:unknown*/ = $(b);
    const tmpUpdObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
    const tmpUpdProp$1 /*:unknown*/ = tmpUpdObj$1.x;
    const tmpUpdNum$1 /*:number*/ = $coerce(tmpUpdProp$1, `number`);
    const tmpUpdInc$1 /*:number*/ = tmpUpdNum$1 + 1;
    tmpUpdObj$1.x = tmpUpdInc$1;
    a = tmpUpdNum$1;
    if (tmpUpdNum$1) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpUpdNum, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdNum = $coerce(tmpUpdObj.x, `number`);
tmpUpdObj.x = tmpUpdNum + 1;
if (tmpUpdNum) {
  let a = undefined;
  while (true) {
    $(1);
    const tmpUpdObj$1 = $($(b));
    const tmpUpdNum$1 = $coerce(tmpUpdObj$1.x, `number`);
    tmpUpdObj$1.x = tmpUpdNum$1 + 1;
    a = tmpUpdNum$1;
    if (!tmpUpdNum$1) {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpUpdNum, b);
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
if (e) {
  let g = undefined;
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const h = $( a );
    const i = $( h );
    const j = i.x;
    const k = $coerce( j, "number" );
    const l = k + 1;
    i.x = l;
    g = k;
    if (k) {

    }
    else {
      break;
    }
  }
  $( g, a );
}
else {
  $( e, a );
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
  a = tmpUpdNum;
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
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
 - 3: 1
 - 4: { x: '2' }
 - 5: { x: '2' }
 - 6: 1
 - 7: { x: '3' }
 - 8: { x: '3' }
 - 9: 1
 - 10: { x: '4' }
 - 11: { x: '4' }
 - 12: 1
 - 13: { x: '5' }
 - 14: { x: '5' }
 - 15: 1
 - 16: { x: '6' }
 - 17: { x: '6' }
 - 18: 1
 - 19: { x: '7' }
 - 20: { x: '7' }
 - 21: 1
 - 22: { x: '8' }
 - 23: { x: '8' }
 - 24: 1
 - 25: { x: '9' }
 - 26: { x: '9' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
