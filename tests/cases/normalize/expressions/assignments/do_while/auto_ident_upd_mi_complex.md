# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = --$($(b)).x));
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
const b /*:object*/ /*truthy*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdInc) {
  let a /*:unknown*/ = undefined;
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 /*:unknown*/ = $(b);
    const tmpUpdObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
    const tmpUpdProp$1 /*:unknown*/ = tmpUpdObj$1.x;
    const tmpUpdNum$1 /*:number*/ = $coerce(tmpUpdProp$1, `number`);
    const tmpUpdInc$1 /*:number*/ = tmpUpdNum$1 - 1;
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
$(100);
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) - 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdInc) {
  let a = undefined;
  while (true) {
    $(100);
    const tmpUpdObj$1 = $($(b));
    const tmpUpdInc$1 = $coerce(tmpUpdObj$1.x, `number`) - 1;
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
$( 100 );
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e - 1;
c.x = f;
if (f) {
  let g = undefined;
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const h = $( a );
    const i = $( h );
    const j = i.x;
    const k = $coerce( j, "number" );
    const l = k - 1;
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
  $(100);
  let tmpCalleeParam = $(b);
  const tmpUpdObj = $(tmpCalleeParam);
  const tmpUpdProp = tmpUpdObj.x;
  const tmpUpdNum = $coerce(tmpUpdProp, `number`);
  const tmpUpdInc = tmpUpdNum - 1;
  tmpUpdObj.x = tmpUpdInc;
  a = tmpUpdInc;
  const tmpIfTest = a;
  if (tmpIfTest) {
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
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 0, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
