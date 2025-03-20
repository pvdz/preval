# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > For in left > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = $($(1)) && $($(2))).x in $({ x: 1 }));
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
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    a = $(tmpCalleeParam$3);
    let tmpAssignMemLhsObj /*:unknown*/ = undefined;
    if (a) {
      const tmpCalleeParam$5 /*:unknown*/ = $(2);
      const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$5);
      tmpAssignMemLhsObj = tmpClusterSSA_a;
    } else {
      tmpAssignMemLhsObj = a;
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
    a = $($(1));
    let tmpAssignMemLhsObj = undefined;
    if (a) {
      tmpAssignMemLhsObj = $($(2));
    } else {
      tmpAssignMemLhsObj = a;
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
    const g = $( 1 );
    a = $( g );
    let h = undefined;
    if (a) {
      const i = $( 2 );
      const j = $( i );
      h = j;
    }
    else {
      h = a;
    }
    const k = e.value;
    h.x = k;
  }
}
$( a );
`````


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - eval returned: ("<crash[ Cannot create property 'x' on number '2' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
