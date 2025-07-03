# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident upd ip complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = $($(b)).x++);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ /*truthy*/ = { x: 1 };
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(b);
  const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
  const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
  const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
  const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
  tmpUpdObj.x = tmpUpdInc;
  let tmpClusterSSA_a /*:number*/ = tmpUpdNum;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$1 /*:unknown*/ = $(b);
      const tmpUpdObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
      const tmpUpdProp$1 /*:unknown*/ = tmpUpdObj$1.x;
      const tmpUpdNum$1 /*:number*/ = $coerce(tmpUpdProp$1, `number`);
      const tmpUpdInc$1 /*:number*/ = tmpUpdNum$1 + 1;
      tmpUpdObj$1.x = tmpUpdInc$1;
      tmpClusterSSA_a = tmpUpdNum$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, b);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { x: 1 };
if (tmpIfTest) {
  const tmpUpdObj = $($(b));
  const tmpUpdNum = Number(tmpUpdObj.x);
  tmpUpdObj.x = tmpUpdNum + 1;
  let tmpClusterSSA_a = tmpUpdNum;
  while (true) {
    if ($(1)) {
      const tmpUpdObj$1 = $($(b));
      const tmpUpdNum$1 = Number(tmpUpdObj$1.x);
      tmpUpdObj$1.x = tmpUpdNum$1 + 1;
      tmpClusterSSA_a = tmpUpdNum$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, b);
} else {
  $({ a: 999, b: 1000 }, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: 1 };
if (a) {
  const c = $( b );
  const d = $( c );
  const e = d.x;
  const f = $coerce( e, "number" );
  const g = f + 1;
  d.x = g;
  let h = f;
  while ($LOOP_UNROLL_10) {
    const i = $( 1 );
    if (i) {
      const j = $( b );
      const k = $( j );
      const l = k.x;
      const m = $coerce( l, "number" );
      const n = m + 1;
      k.x = n;
      h = m;
    }
    else {
      break;
    }
  }
  $( h, b );
}
else {
  const o = {
    a: 999,
    b: 1000,
  };
  $( o, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    let tmpCalleeParam = $(b);
    const tmpUpdObj = $(tmpCalleeParam);
    const tmpUpdProp = tmpUpdObj.x;
    const tmpUpdNum = $coerce(tmpUpdProp, `number`);
    const tmpUpdInc = tmpUpdNum + 1;
    tmpUpdObj.x = tmpUpdInc;
    a = tmpUpdNum;
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
