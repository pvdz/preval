# Preval test case

# simple_complex.md

> Normalize > For > Forof > Simple complex
>
> For-in must be normalized

## Input

`````js filename=intro
let a;
for (a of $({x: 1, y: 2})) $(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1, y: 2 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpClusterSSA_a /*:unknown*/ = tmpForOfNext.value;
    $(tmpClusterSSA_a);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf($({ x: 1, y: 2 }));
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    $(tmpForOfNext.value);
  }
}
`````

## Pre Normal


`````js filename=intro
let a;
{
  let tmpForOfGen = $forOf($({ x: 1, y: 2 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      a = tmpForOfNext.value;
      $(a);
    }
  }
}
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpCalleeParam$1 = { x: 1, y: 2 };
const tmpCalleeParam = $(tmpCalleeParam$1);
let tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = tmpForOfNext.value;
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c.next();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = d.value;
    $( f );
  }
}
`````

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

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next
