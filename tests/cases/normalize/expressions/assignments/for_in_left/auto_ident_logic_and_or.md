# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > For in left > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = ($($(1)) && $($(1))) || $($(2))).x in $({ x: 1 }));
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
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$3);
    if (a) {
      const tmpCalleeParam$5 /*:unknown*/ = $(1);
      a = $(tmpCalleeParam$5);
    } else {
    }
    let tmpAssignMemLhsObj /*:unknown*/ = undefined;
    if (a) {
      tmpAssignMemLhsObj = a;
    } else {
      const tmpCalleeParam$7 /*:unknown*/ = $(2);
      const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$7);
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
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    a = $($(1));
    if (a) {
      a = $($(1));
    }
    let tmpAssignMemLhsObj = undefined;
    if (a) {
      tmpAssignMemLhsObj = a;
    } else {
      tmpAssignMemLhsObj = $($(2));
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
    const g = $( 1 );
    a = $( g );
    if (a) {
      const h = $( 1 );
      a = $( h );
    }
    let i = undefined;
    if (a) {
      i = a;
    }
    else {
      const j = $( 2 );
      const k = $( j );
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
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
