# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > For in left > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = $($(0)) || $($(1)) || $($(2))).x in $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(0);
    a = $(tmpCalleeParam$3);
    if (a) {
    } else {
      const tmpCalleeParam$5 /*:unknown*/ = $(1);
      a = $(tmpCalleeParam$5);
      if (a) {
      } else {
        const tmpCalleeParam$7 /*:unknown*/ = $(2);
        a = $(tmpCalleeParam$7);
      }
    }
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    a.x = tmpAssignMemRhs;
  }
}
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForInGenNext = $forIn($({ x: 1 }));
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    a = $($(0));
    if (!a) {
      a = $($(1));
      if (!a) {
        a = $($(2));
      }
    }
    a.x = tmpForInNext.value;
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
    const g = $( 0 );
    a = $( g );
    if (a) {

    }
    else {
      const h = $( 1 );
      a = $( h );
      if (a) {

      }
      else {
        const i = $( 2 );
        a = $( i );
      }
    }
    const j = e.value;
    a.x = j;
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
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
