# Preval test case

# complex_simple.md

> Normalize > For > Forof > Complex simple
>
> For-in must be normalized

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a).x of b) $(a.x);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1, y: 2 };
const tmpForOfGen /*:unknown*/ = $forOf(b);
const a /*:object*/ /*truthy*/ = {};
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpAssignMemLhsObj$1 /*:unknown*/ = $(a);
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
    const tmpCalleeParam /*:unknown*/ = a.x;
    $(tmpCalleeParam);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf({ x: 1, y: 2 });
const a = {};
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpAssignMemLhsObj$1 = $(a);
    tmpAssignMemLhsObj$1.x = tmpForOfNext.value;
    $(a.x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
};
const b = $forOf( a );
const c = {};
while ($LOOP_NO_UNROLLS_LEFT) {
  const d = b();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = $( c );
    const g = d.value;
    f.x = g;
    const h = c.x;
    $( h );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
const tmpForOfGen = $forOf(b);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForOfNext = tmpForOfGen();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpAssignMemLhsObj = $(a);
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
    let tmpCalleeParam = a.x;
    $(tmpCalleeParam);
  }
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
