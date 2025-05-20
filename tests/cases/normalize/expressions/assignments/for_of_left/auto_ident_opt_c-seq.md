# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > For of left > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for ((a = (1, 2, $(b))?.x).x of $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const b /*:object*/ = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = undefined;
    const tmpChainRootProp /*:unknown*/ = $(b);
    const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp == null;
    let tmpAssignMemLhsObj$1 /*:unknown*/ = undefined;
    if (tmpIfTest$1) {
    } else {
      tmpAssignMemLhsObj$1 = tmpChainRootProp.x;
    }
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a);
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
    a = undefined;
    const tmpChainRootProp = $(b);
    const tmpIfTest$1 = tmpChainRootProp == null;
    let tmpAssignMemLhsObj$1 = undefined;
    if (!tmpIfTest$1) {
      tmpAssignMemLhsObj$1 = tmpChainRootProp.x;
    }
    tmpAssignMemLhsObj$1.x = tmpForOfNext.value;
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
const d = $forOf( c );
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
      j = h.x;
    }
    const k = f.value;
    j.x = k;
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
