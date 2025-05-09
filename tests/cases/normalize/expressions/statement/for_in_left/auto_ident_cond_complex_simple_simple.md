# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > For in left > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($(1) ? 2 : $($(100))).x in $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    let tmpAssignMemLhsObj$1 /*:unknown*/ = 2;
    if (tmpIfTest$1) {
    } else {
      const tmpCalleeParam$3 /*:unknown*/ = $(100);
      tmpAssignMemLhsObj$1 = $(tmpCalleeParam$3);
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
const tmpForInGenNext = $forIn($({ x: 1 }));
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpIfTest$1 = $(1);
    let tmpAssignMemLhsObj$1 = 2;
    if (!tmpIfTest$1) {
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
  const d = c();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = $( 1 );
    let g = 2;
    if (f) {

    }
    else {
      const h = $( 100 );
      g = $( h );
    }
    const i = d.value;
    g.x = i;
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '2' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
