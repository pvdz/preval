# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > For of left > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for ((a = --$($(b)).x).x of $({ x: 1 }));
$(a, b);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const b /*:object*/ /*truthy*/ = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(b);
    const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$3);
    const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
    const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
    const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
    tmpUpdObj.x = tmpUpdInc;
    a = tmpUpdInc;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpUpdInc.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForOfGen = $forOf($({ x: 1 }));
const b = { x: 1 };
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpUpdObj = $($(b));
    const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) - 1;
    tmpUpdObj.x = tmpUpdInc;
    a = tmpUpdInc;
    tmpUpdInc.x = tmpForOfNext.value;
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
const b = { x: 1 };
const c = $( b );
const d = $forOf( c );
const e = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = d();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    const h = $( e );
    const i = $( h );
    const j = i.x;
    const k = $coerce( j, "number" );
    const l = k - 1;
    i.x = l;
    a = l;
    const m = f.value;
    l.x = m;
  }
}
$( a, e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = { x: 1 };
let tmpCalleeParam = $(tmpCalleeParam$1);
const tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGen();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let tmpCalleeParam$3 = $(b);
    const tmpUpdObj = $(tmpCalleeParam$3);
    const tmpUpdProp = tmpUpdObj.x;
    const tmpUpdNum = $coerce(tmpUpdProp, `number`);
    const tmpUpdInc = tmpUpdNum - 1;
    tmpUpdObj.x = tmpUpdInc;
    a = tmpUpdInc;
    const tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
