# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > For in left > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = $($(0)) || ($($(1)) && $($(2)))).x in $({ x: 1 }));
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
    const tmpCalleeParam$3 /*:unknown*/ = $(0);
    a = $(tmpCalleeParam$3);
    if (a) {
    } else {
      const tmpCalleeParam$5 /*:unknown*/ = $(1);
      a = $(tmpCalleeParam$5);
      if (a) {
        const tmpCalleeParam$7 /*:unknown*/ = $(2);
        a = $(tmpCalleeParam$7);
      } else {
      }
    }
    const tmpAssignMemLhsObj /*:unknown*/ = a;
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
    a = $($(0));
    if (!a) {
      a = $($(1));
      if (a) {
        a = $($(2));
      }
    }
    const tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForInNext.value;
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForInGen = $forIn($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      (a = $($(0)) || ($($(1)) && $($(2)))).x = tmpForInNext.value;
    }
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = $(tmpCalleeParam$1);
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCalleeParam$3 = $(0);
    a = $(tmpCalleeParam$3);
    if (a) {
    } else {
      const tmpCalleeParam$5 = $(1);
      a = $(tmpCalleeParam$5);
      if (a) {
        const tmpCalleeParam$7 = $(2);
        a = $(tmpCalleeParam$7);
      } else {
      }
    }
    let tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
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
    const g = $( 0 );
    a = $( g );
    if (a) {

    }
    else {
      const h = $( 1 );
      a = $( h );
      if (a) {
        const i = $( 2 );
        a = $( i );
      }
    }
    const j = a;
    const k = e.value;
    j.x = k;
  }
}
$( a );
`````

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

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next
