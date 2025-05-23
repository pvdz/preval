# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > For in left > Auto ident c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for ((a = $(b)?.[$("x")]).x in $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
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
    a = undefined;
    const tmpChainElementCall /*:unknown*/ = $(b);
    const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
    let tmpAssignMemLhsObj$1 /*:unknown*/ /*ternaryConst*/ = undefined;
    if (tmpIfTest$1) {
    } else {
      const tmpChainRootComputed /*:unknown*/ = $(`x`);
      tmpAssignMemLhsObj$1 = tmpChainElementCall[tmpChainRootComputed];
    }
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForInGenNext = $forIn($({ x: 1 }));
const b = { x: 1 };
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    a = undefined;
    const tmpChainElementCall = $(b);
    const tmpIfTest$1 = tmpChainElementCall == null;
    let tmpAssignMemLhsObj$1 = undefined;
    if (!tmpIfTest$1) {
      const tmpChainRootComputed = $(`x`);
      tmpAssignMemLhsObj$1 = tmpChainElementCall[tmpChainRootComputed];
    }
    tmpAssignMemLhsObj$1.x = tmpForInNext.value;
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
const e = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = d();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    a = undefined;
    const h = $( e );
    const i = h == null;
    let j = undefined;
    if (i) {

    }
    else {
      const k = $( "x" );
      j = h[ k ];
    }
    const l = f.value;
    j.x = l;
  }
}
$( a );
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 'x'
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
