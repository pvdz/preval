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
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
const a /*:object*/ = {};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
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
const tmpForInGen = $forIn($({ x: 1, y: 2 }));
const a = {};
while (true) {
  const tmpForInNext = tmpForInGen.next();
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

## Pre Normal


`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
{
  let tmpForInGen = $forIn($(b));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      $(a)[$(`foo`)] = tmpForInNext.value;
      $(a);
    }
  }
}
`````

## Normalized


`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
const tmpCalleeParam = $(b);
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpAssignComMemLhsObj = $(a);
    const tmpAssignComMemLhsProp = $(`foo`);
    const tmpAssignComputedObj = tmpAssignComMemLhsObj;
    const tmpAssignComputedProp = tmpAssignComMemLhsProp;
    const tmpAssignComputedRhs = tmpForInNext.value;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
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

Todos triggered:
- objects in isFree check
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next
