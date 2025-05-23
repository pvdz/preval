# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > For in left > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for ((--$($(b)).x).x in $({ x: 1 }));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam);
const b /*:object*/ = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(b);
    const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$3);
    const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
    const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
    const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
    tmpUpdObj.x = tmpUpdInc;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpUpdInc.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGenNext = $forIn($({ x: 1 }));
const b = { x: 1 };
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpUpdObj = $($(b));
    const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) - 1;
    tmpUpdObj.x = tmpUpdInc;
    tmpUpdInc.x = tmpForInNext.value;
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forIn( b );
const d = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( d );
    const h = $( g );
    const i = h.x;
    const j = $coerce( i, "number" );
    const k = j - 1;
    h.x = k;
    const l = e.value;
    k.x = l;
  }
}
const m = {
  a: 999,
  b: 1000,
};
$( m, d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = { x: 1 };
let tmpCalleeParam = $(tmpCalleeParam$1);
const tmpForInGenNext = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGenNext();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let tmpCalleeParam$3 = $(b);
    const tmpUpdObj = $(tmpCalleeParam$3);
    const tmpUpdProp = tmpUpdObj.x;
    const tmpUpdNum = $coerce(tmpUpdProp, `number`);
    const tmpUpdInc = tmpUpdNum - 1;
    tmpUpdObj.x = tmpUpdInc;
    const tmpAssignMemLhsObj = tmpUpdInc;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
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
 - 3: { x: '1' }
 - eval returned: ("<crash[ Cannot create property 'x' on number '0' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
