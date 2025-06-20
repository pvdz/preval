# Preval test case

# auto_computed_complex_simple_simple.md

> Normalize > Expressions > Assignments > For of left > Auto computed complex simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = { b: $(1) }).x of $({ x: 1 }));
$(a)["b"] = 2;
$(a);
`````


## Settled


`````js filename=intro
let a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpObjLitVal /*:unknown*/ = $(1);
    a = { b: tmpObjLitVal };
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    a.x = tmpAssignMemRhs;
  }
}
const tmpAssignMemLhsObj$3 /*:unknown*/ = $(a);
tmpAssignMemLhsObj$3.b = 2;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForOfGen = $forOf($({ x: 1 }));
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpObjLitVal = $(1);
    a = { b: tmpObjLitVal };
    a.x = tmpForOfNext.value;
  }
}
const tmpAssignMemLhsObj$3 = $(a);
tmpAssignMemLhsObj$3.b = 2;
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
const d = $forOf( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( 1 );
    a = { b: g };
    const h = e.value;
    a.x = h;
  }
}
const i = $( a );
i.b = 2;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = { x: 1 };
let tmpCalleeParam = $(tmpCalleeParam$1);
const tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGen();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpObjLitVal = $(1);
    a = { b: tmpObjLitVal };
    const tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
const tmpAssignMemLhsObj$3 = $(a);
tmpAssignMemLhsObj$3.b = 2;
$(a);
`````


## Todos triggered


None


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
