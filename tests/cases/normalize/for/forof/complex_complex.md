# Preval test case

# complex_complex.md

> Normalize > For > Forof > Complex complex
>
> For-in must be normalized

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a).x of $(b)) $(a.x);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1, y: 2 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const a /*:object*/ = {};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpAssignMemLhsObj$1 /*:unknown*/ = $(a);
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
    const tmpCalleeParam$1 /*:unknown*/ = a.x;
    $(tmpCalleeParam$1);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf($({ x: 1, y: 2 }));
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
const b = $( a );
const c = $forOf( b );
const d = {};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( d );
    const h = e.value;
    g.x = h;
    const i = d.x;
    $( i );
  }
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1', y: '2' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
