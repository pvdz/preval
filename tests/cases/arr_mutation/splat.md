# Preval test case

# splat.md

> Arr mutation > Splat
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const arr = [1, 2, 3];
for (const a in arr) {
  const b = a;
  $(b);
}
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
const tmpForInGen /*:unknown*/ = $forIn(arr);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const a /*:unknown*/ = tmpForInNext.value;
    $(a);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn([1, 2, 3]);
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
const arr = [1, 2, 3];
{
  let tmpForInGen = $forIn(arr);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      const a = tmpForInNext.value;
      {
        const b = a;
        $(b);
      }
    }
  }
}
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
let tmpForInGen = $forIn(arr);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const a = tmpForInNext.value;
    const b = a;
    $(b);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
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
 - 1: '0'
 - 2: '1'
 - 3: '2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next