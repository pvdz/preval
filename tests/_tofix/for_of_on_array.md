# Preval test case

# for_of_on_array.md

> Tofix > for of on array

We can extrapolate and unroll a `for-of` on an array literal (or anything where we can predict the iterator behavior).
That means we can simplify the next to $(1) $(2) $(3). ymmv on how explosive that unroll would be with a huge while body, though.
Need to figure out how to pattern match it properly since we won't see it before it turns into a $forOf, but that's ok?
Same applies to $forIn on known objects, albeit slightly riskier due to inheritance. But that boat sailed anyways.

## Input

`````js filename=intro
const arr = [1, 2, 3];
for (const x of arr) $(x);
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
const tmpForOfGen /*:unknown*/ = $forOf(arr);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x /*:unknown*/ = tmpForOfNext.value;
    $(x);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf([1, 2, 3]);
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
const arr = [1, 2, 3];
{
  let tmpForOfGen = $forOf(arr);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      const x = tmpForOfNext.value;
      $(x);
    }
  }
}
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
let tmpForOfGen = $forOf(arr);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x = tmpForOfNext.value;
    $(x);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $forOf( a );
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
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next
