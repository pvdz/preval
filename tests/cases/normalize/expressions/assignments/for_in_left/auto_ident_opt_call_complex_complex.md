# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > For in left > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = $($)?.($(1))).x in $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = undefined;
    const tmpChainElementCall /*:unknown*/ = $($);
    const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
    let tmpAssignMemLhsObj /*:unknown*/ = undefined;
    if (tmpIfTest$1) {
    } else {
      const tmpCalleeParam$7 /*:unknown*/ = $(1);
      const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$7);
      tmpAssignMemLhsObj = tmpChainElementCall$1;
    }
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  }
}
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForInGen = $forIn($({ x: 1 }));
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    a = undefined;
    const tmpChainElementCall = $($);
    const tmpIfTest$1 = tmpChainElementCall == null;
    let tmpAssignMemLhsObj = undefined;
    if (!tmpIfTest$1) {
      tmpAssignMemLhsObj = $dotCall(tmpChainElementCall, $, undefined, $(1));
    }
    tmpAssignMemLhsObj.x = tmpForInNext.value;
  }
}
$(a);
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
const d = $forIn( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    a = undefined;
    const g = $( $ );
    const h = g == null;
    let i = undefined;
    if (h) {

    }
    else {
      const j = $( 1 );
      const k = $dotCall( g, $, undefined, j );
      i = k;
    }
    const l = e.value;
    i.x = l;
  }
}
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
