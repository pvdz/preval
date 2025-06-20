# Preval test case

# if-both-nobreak.md

> Try escaping > If-both-nobreak
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
let x = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    if (x) $ === 2; // It's safe... what can I say. At the time of writing it was catching a branch and not eliminated yet.
    else break;
  } catch {
    $('fail');
  }
  $(5);
}
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    if (x) {
    } else {
      break;
    }
  } catch (e) {
    $(`fail`);
  }
  $(5);
}
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
while (true) {
  try {
    if (!x) {
      break;
    }
  } catch (e) {
    $(`fail`);
  }
  $(5);
}
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    if (a) {

    }
    else {
      break;
    }
  }
  catch (b) {
    $( "fail" );
  }
  $( 5 );
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
let x = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    if (x) {
    } else {
      break;
    }
  } catch (e) {
    $(`fail`);
  }
  $(5);
}
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 5
 - 3: 5
 - 4: 5
 - 5: 5
 - 6: 5
 - 7: 5
 - 8: 5
 - 9: 5
 - 10: 5
 - 11: 5
 - 12: 5
 - 13: 5
 - 14: 5
 - 15: 5
 - 16: 5
 - 17: 5
 - 18: 5
 - 19: 5
 - 20: 5
 - 21: 5
 - 22: 5
 - 23: 5
 - 24: 5
 - 25: 5
 - 26: 5
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
