# Preval test case

# simple_simple.md

> Normalize > For > Forin > Simple simple
>
> For-in must be normalized

## Input

`````js filename=intro
let a;
let b = {x: 1, y: 2}
for (a in b) $(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1, y: 2 };
const tmpForInGen /*:unknown*/ = $forIn(b);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpClusterSSA_a /*:unknown*/ = tmpForInNext.value;
    $(tmpClusterSSA_a);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn({ x: 1, y: 2 });
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    $(tmpForInNext.value);
  }
}
`````

## Pre Normal


`````js filename=intro
let a;
let b = { x: 1, y: 2 };
{
  let tmpForInGen = $forIn(b);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      a = tmpForInNext.value;
      $(a);
    }
  }
}
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = { x: 1, y: 2 };
let tmpForInGen = $forIn(b);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = tmpForInNext.value;
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
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    $( e );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'x'
 - 2: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next