# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > For of left > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($(1)) && $($(2))).x of $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    const tmpAssignMemLhsObj /*:unknown*/ = $(tmpCalleeParam$3);
    let tmpAssignMemLhsObj$1 /*:unknown*/ = undefined;
    if (tmpAssignMemLhsObj) {
      const tmpCalleeParam$5 /*:unknown*/ = $(2);
      const tmpClusterSSA_tmpAssignMemLhsObj /*:unknown*/ = $(tmpCalleeParam$5);
      tmpAssignMemLhsObj$1 = tmpClusterSSA_tmpAssignMemLhsObj;
    } else {
      tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    }
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf($({ x: 1 }));
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpAssignMemLhsObj = $($(1));
    let tmpAssignMemLhsObj$1 = undefined;
    if (tmpAssignMemLhsObj) {
      tmpAssignMemLhsObj$1 = $($(2));
    } else {
      tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    }
    tmpAssignMemLhsObj$1.x = tmpForOfNext.value;
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forOf( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c.next();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = $( 1 );
    const g = $( f );
    let h = undefined;
    if (g) {
      const i = $( 2 );
      const j = $( i );
      h = j;
    }
    else {
      h = g;
    }
    const k = d.value;
    h.x = k;
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l );
`````


## Todos triggered


- (todo) Calling a static method on an ident that is not global and not recorded in free loop: tmpForOfGen.next


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
