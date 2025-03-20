# Preval test case

# computed_complex.md

> Normalize > For > Forof > Computed complex
>
> For-in must be normalized

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a)[$('foo')] of $(b)) $(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1, y: 2 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const a /*:object*/ = {};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpAssignComMemLhsObj /*:unknown*/ = $(a);
    const tmpAssignComMemLhsProp /*:unknown*/ = $(`foo`);
    const tmpAssignComputedRhs /*:unknown*/ = tmpForOfNext.value;
    tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
    $(a);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf($({ x: 1, y: 2 }));
const a = {};
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpAssignComMemLhsObj = $(a);
    const tmpAssignComMemLhsProp = $(`foo`);
    const tmpAssignComputedRhs = tmpForOfNext.value;
    tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
    $(a);
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
  const e = c.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( d );
    const h = $( "foo" );
    const i = e.value;
    g[h] = i;
    $( d );
  }
}
`````


## Todos triggered


- objects in isFree check
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next


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
