# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > While > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while (--$($(b)).x) $(100);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdInc) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 /*:unknown*/ = $(b);
    const tmpUpdObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
    const tmpUpdProp$1 /*:unknown*/ = tmpUpdObj$1.x;
    const tmpUpdNum$1 /*:number*/ = $coerce(tmpUpdProp$1, `number`);
    const tmpUpdInc$1 /*:number*/ = tmpUpdNum$1 - 1;
    tmpUpdObj$1.x = tmpUpdInc$1;
    if (tmpUpdInc$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) - 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdInc) {
  while (true) {
    $(100);
    const tmpUpdObj$1 = $($(b));
    const tmpUpdInc$1 = $coerce(tmpUpdObj$1.x, `number`) - 1;
    tmpUpdObj$1.x = tmpUpdInc$1;
    if (!tmpUpdInc$1) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e - 1;
c.x = f;
if (f) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const g = $( a );
    const h = $( g );
    const i = h.x;
    const j = $coerce( i, "number" );
    const k = j - 1;
    h.x = k;
    if (k) {

    }
    else {
      break;
    }
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l, a );
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
  const tmpUpdInc = tmpUpdNum - 1;
  tmpUpdObj.x = tmpUpdInc;
  const tmpIfTest = tmpUpdInc;
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
 - 3: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
