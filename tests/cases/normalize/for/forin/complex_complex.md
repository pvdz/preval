# Preval test case

# complex_complex.md

> Normalize > For > Forin > Complex complex
>
> For-in must be normalized

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a).x in $(b)) $(a.x);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1, y: 2 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam);
const a /*:object*/ = {};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpAssignMemLhsObj /*:unknown*/ = $(a);
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    const tmpCalleeParam$1 /*:unknown*/ = a.x;
    $(tmpCalleeParam$1);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGenNext = $forIn($({ x: 1, y: 2 }));
const a = {};
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpAssignMemLhsObj = $(a);
    tmpAssignMemLhsObj.x = tmpForInNext.value;
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
const c = $forIn( b );
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
 - 2: {}
 - 3: 'x'
 - 4: { x: '"x"' }
 - 5: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
