# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > For in left > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = (10, 20, $(30)) ? $(2) : $($(100))).x in $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpIfTest$1 /*:unknown*/ = $(30);
    let tmpAssignMemLhsObj /*:unknown*/ = undefined;
    if (tmpIfTest$1) {
      a = $(2);
      tmpAssignMemLhsObj = a;
    } else {
      const tmpCalleeParam$3 /*:unknown*/ = $(100);
      const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$3);
      tmpAssignMemLhsObj = tmpClusterSSA_a;
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
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpIfTest$1 = $(30);
    let tmpAssignMemLhsObj = undefined;
    if (tmpIfTest$1) {
      a = $(2);
      tmpAssignMemLhsObj = a;
    } else {
      tmpAssignMemLhsObj = $($(100));
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
  const e = d.next();
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
      const j = $( i );
      h = j;
    }
    const k = e.value;
    h.x = k;
  }
}
$( a );
`````


## Todos triggered


- (todo) Calling a static method on an ident that is not global and not recorded in free loop: tmpForInGen.next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 30
 - 3: 2
 - eval returned: ("<crash[ Cannot create property 'x' on number '2' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
