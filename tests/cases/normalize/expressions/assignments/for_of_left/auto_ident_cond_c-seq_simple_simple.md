# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > For of left > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = (10, 20, $(30)) ? $(2) : $($(100))).x of $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpIfTest$1 /*:unknown*/ = $(30);
    let tmpAssignMemLhsObj$1 /*:unknown*/ /*ternaryConst*/ = undefined;
    if (tmpIfTest$1) {
      a = $(2);
      tmpAssignMemLhsObj$1 = a;
    } else {
      const tmpCalleeParam$3 /*:unknown*/ = $(100);
      a = $(tmpCalleeParam$3);
      tmpAssignMemLhsObj$1 = a;
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
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpIfTest$1 = $(30);
    let tmpAssignMemLhsObj$1 = undefined;
    if (tmpIfTest$1) {
      a = $(2);
      tmpAssignMemLhsObj$1 = a;
    } else {
      a = $($(100));
      tmpAssignMemLhsObj$1 = a;
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( 30 );
    let h = undefined;
    if (g) {
      a = $( 2 );
      h = a;
    }
    else {
      const i = $( 100 );
      a = $( i );
      h = a;
    }
    const j = e.value;
    h.x = j;
  }
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
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
    const tmpIfTest$1 = $(30);
    if (tmpIfTest$1) {
      a = $(2);
    } else {
      let tmpCalleeParam$3 = $(100);
      a = $(tmpCalleeParam$3);
    }
    const tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a);
`````


## Todos triggered


None


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
