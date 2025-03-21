# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > For in left > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($(0)) || ($($(1)) && $($(2)))).x in $({ x: 1 }));
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
    const tmpCalleeParam$3 /*:unknown*/ = $(0);
    let tmpAssignMemLhsObj /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpAssignMemLhsObj) {
    } else {
      const tmpCalleeParam$5 /*:unknown*/ = $(1);
      tmpAssignMemLhsObj = $(tmpCalleeParam$5);
      if (tmpAssignMemLhsObj) {
        const tmpCalleeParam$7 /*:unknown*/ = $(2);
        tmpAssignMemLhsObj = $(tmpCalleeParam$7);
      } else {
      }
    }
    const tmpAssignMemLhsObj$1 /*:unknown*/ = tmpAssignMemLhsObj;
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
    let tmpAssignMemLhsObj = $($(0));
    if (!tmpAssignMemLhsObj) {
      tmpAssignMemLhsObj = $($(1));
      if (tmpAssignMemLhsObj) {
        tmpAssignMemLhsObj = $($(2));
      }
    }
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
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
    const f = $( 0 );
    let g = $( f );
    if (g) {

    }
    else {
      const h = $( 1 );
      g = $( h );
      if (g) {
        const i = $( 2 );
        g = $( i );
      }
    }
    const j = g;
    const k = d.value;
    j.x = k;
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l );
`````


## Todos triggered


- (todo) Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - eval returned: ("<crash[ Cannot create property 'x' on number '2' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
