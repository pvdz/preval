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
const b /*:object*/ = { x: 1, y: 2 };
const tmpForOfGen /*:unknown*/ = $forOf(b);
const a /*:object*/ = {};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpAssignMemLhsObj /*:unknown*/ = $(a);
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
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
    const tmpAssignMemLhsObj = $(a);
    tmpAssignMemLhsObj.x = tmpForOfNext.value;
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
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
