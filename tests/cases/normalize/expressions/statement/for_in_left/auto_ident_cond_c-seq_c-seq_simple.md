# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > For in left > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (((10, 20, $(30)) ? (40, 50, $(60)) : $($(100))).x in $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
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
    let tmpAssignMemLhsObj$1 /*:unknown*/ = undefined;
    if (tmpIfTest$1) {
      const tmpClusterSSA_tmpAssignMemLhsObj /*:unknown*/ = $(60);
      tmpAssignMemLhsObj$1 = tmpClusterSSA_tmpAssignMemLhsObj;
    } else {
      const tmpCalleeParam$3 /*:unknown*/ = $(100);
      const tmpClusterSSA_tmpAssignMemLhsObj$1 /*:unknown*/ = $(tmpCalleeParam$3);
      tmpAssignMemLhsObj$1 = tmpClusterSSA_tmpAssignMemLhsObj$1;
    }
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn($({ x: 1 }));
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpIfTest$1 = $(30);
    let tmpAssignMemLhsObj$1 = undefined;
    if (tmpIfTest$1) {
      tmpAssignMemLhsObj$1 = $(60);
    } else {
      tmpAssignMemLhsObj$1 = $($(100));
    }
    tmpAssignMemLhsObj$1.x = tmpForInNext.value;
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forIn( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c.next();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = $( 30 );
    let g = undefined;
    if (f) {
      const h = $( 60 );
      g = h;
    }
    else {
      const i = $( 100 );
      const j = $( i );
      g = j;
    }
    const k = d.value;
    g.x = k;
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l );
`````


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 30
 - 3: 60
 - eval returned: ("<crash[ Cannot create property 'x' on number '60' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
