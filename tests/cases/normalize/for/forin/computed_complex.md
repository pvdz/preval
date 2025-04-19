# Preval test case

# computed_complex.md

> Normalize > For > Forin > Computed complex
>
> For-in must be normalized

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a)[$('foo')] in $(b)) $(a);
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
    const tmpAssignComMemLhsObj /*:unknown*/ = $(a);
    const tmpAssignComMemLhsProp /*:unknown*/ = $(`foo`);
    const tmpAssignComputedRhs /*:unknown*/ = tmpForInNext.value;
    tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
    $(a);
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
    const tmpAssignComMemLhsObj = $(a);
    const tmpAssignComMemLhsProp = $(`foo`);
    const tmpAssignComputedRhs = tmpForInNext.value;
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
    const h = $( "foo" );
    const i = e.value;
    g[h] = i;
    $( d );
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
 - 3: 'foo'
 - 4: { foo: '"x"' }
 - 5: { foo: '"x"' }
 - 6: 'foo'
 - 7: { foo: '"y"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
