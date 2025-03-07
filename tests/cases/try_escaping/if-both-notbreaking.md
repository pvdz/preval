# Preval test case

# if-both-notbreaking.md

> Try escaping > If-both-notbreaking
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
let x = $(1);
const y = $(3);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    if (x) x = $ === 2; // At the time of writing it was catching a branch and not eliminated yet.
    else x = $ === 3;
    $(1);
  } catch {
    $('fail');
  }
}
$(x);
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = $(1);
$(3);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (x) {
    x = $ === 2;
  } else {
    x = $ === 3;
  }
  try {
    $(1);
  } catch (e) {
    $(`fail`);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(1);
$(3);
while (true) {
  if (x) {
    x = $ === 2;
  } else {
    x = $ === 3;
  }
  try {
    $(1);
  } catch (e) {
    $(`fail`);
  }
}
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
let x = $(1);
const y = $(3);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    if (x) x = $ === 2;
    else x = $ === 3;
    $(1);
  } catch (e) {
    $(`fail`);
  }
}
$(x);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
let x = $(1);
const y = $(3);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    if (x) {
      x = $ === 2;
    } else {
      x = $ === 3;
    }
    $(1);
  } catch (e) {
    $(`fail`);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = $( 1 );
$( 3 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (a) {
    a = $ === 2;
  }
  else {
    a = $ === 3;
  }
  try {
    $( 1 );
  }
  catch (b) {
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
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
