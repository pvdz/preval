# Preval test case

# real_parseint.md

> Try escaping > Real parseint
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(parseInt(arr[0]));
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
  const tmpCalleeParam$1 /*:primitive*/ = arr[0];
  const tmpCalleeParam /*:number*/ = parseInt(tmpCalleeParam$1);
  try {
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
  const tmpCalleeParam = parseInt(arr[0]);
  try {
    $(tmpCalleeParam);
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
    $(parseInt(arr[0]));
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
    const tmpCalleeParam$1 = arr[0];
    const tmpCalleeParam = parseInt(tmpCalleeParam$1);
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
  const b = a[ 0 ];
  const c = parseInt( b );
  try {
    $( c );
    a.reverse();
  }
  catch (d) {
    $( "fail" );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 3
 - 5: 1
 - 6: 3
 - 7: 1
 - 8: 3
 - 9: 1
 - 10: 3
 - 11: 1
 - 12: 3
 - 13: 1
 - 14: 3
 - 15: 1
 - 16: 3
 - 17: 1
 - 18: 3
 - 19: 1
 - 20: 3
 - 21: 1
 - 22: 3
 - 23: 1
 - 24: 3
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
