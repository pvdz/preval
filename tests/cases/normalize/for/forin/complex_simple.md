# Preval test case

# complex_simple.md

> Normalize > For > Forin > Complex simple
>
> For-in must be normalized

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a).x in b) $(a.x);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1, y: 2 };
const tmpForInGenNext /*:unknown*/ = $forIn(b);
const a /*:object*/ /*truthy*/ = {};
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpAssignMemLhsObj$1 /*:unknown*/ = $(a);
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
    const tmpCalleeParam /*:unknown*/ = a.x;
    $(tmpCalleeParam);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGenNext = $forIn({ x: 1, y: 2 });
const a = {};
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpAssignMemLhsObj$1 = $(a);
    tmpAssignMemLhsObj$1.x = tmpForInNext.value;
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
const b = $forIn( a );
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
const tmpForInGenNext = $forIn(b);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForInNext = tmpForInGenNext();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpAssignMemLhsObj = $(a);
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
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
 - 1: {}
 - 2: 'x'
 - 3: { x: '"x"' }
 - 4: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
