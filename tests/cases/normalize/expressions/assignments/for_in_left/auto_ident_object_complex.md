# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > For in left > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = { x: $(1), y: 2, z: $(3) }).x in $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
let a /*:object*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpObjLitVal /*:unknown*/ = $(1);
    const tmpObjLitVal$3 /*:unknown*/ = $(3);
    a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
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
const tmpForInGen = $forIn($({ x: 1 }));
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpObjLitVal = $(1);
    const tmpObjLitVal$3 = $(3);
    a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
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
  const e = d.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( 1 );
    const h = $( 3 );
    a = {
      x: g,
      y: 2,
      z: h,
    };
    const i = e.value;
    a.x = i;
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
 - 3: 3
 - 4: { x: '"x"', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
