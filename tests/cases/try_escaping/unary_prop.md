# Preval test case

# unary_prop.md

> Try escaping > Unary prop
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(delete arr[0]);
    arr.reverse();
  } catch {
    $('fail');
  }
}
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpCalleeParam /*:boolean*/ = delete arr[0];
    $(tmpCalleeParam);
    arr.reverse();
  } catch (e) {
    $(`fail`);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3];
while (true) {
  try {
    $(delete arr[0]);
    arr.reverse();
  } catch (e) {
    $(`fail`);
  }
}
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(delete arr[0]);
    arr.reverse();
  } catch (e) {
    $(`fail`);
  }
}
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpCalleeParam = delete arr[0];
    $(tmpCalleeParam);
    arr.reverse();
  } catch (e) {
    $(`fail`);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const b = delete a[ 0 ];
    $( b );
    a.reverse();
  }
  catch (c) {
    $( "fail" );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: true
 - 5: true
 - 6: true
 - 7: true
 - 8: true
 - 9: true
 - 10: true
 - 11: true
 - 12: true
 - 13: true
 - 14: true
 - 15: true
 - 16: true
 - 17: true
 - 18: true
 - 19: true
 - 20: true
 - 21: true
 - 22: true
 - 23: true
 - 24: true
 - 25: true
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Support this node type as init in isFree:
