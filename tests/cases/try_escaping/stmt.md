# Preval test case

# stmt.md

> Try escaping > Stmt
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
let y = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    [5, 6, $, missing]; // <-- this is the line being checked
    $(y);
    if (++y === $) break;
  } catch {
    $('fail');
  }
}
`````


## Settled


`````js filename=intro
let y /*:number*/ = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    missing;
    $(y);
    y = y + 1;
    const tmpIfTest /*:boolean*/ = y === $;
    if (tmpIfTest) {
      break;
    } else {
    }
  } catch (e) {
    $(`fail`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let y = 1;
while (true) {
  try {
    missing;
    $(y);
    y = y + 1;
    if (y === $) {
      break;
    }
  } catch (e) {
    $(`fail`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    missing;
    $( a );
    a = a + 1;
    const b = a === $;
    if (b) {
      break;
    }
  }
  catch (c) {
    $( "fail" );
  }
}
`````


## Globals


BAD@! Found 1 implicit global bindings:

missing


## Runtime Outcome


Should call `$` with:
 - 1: 'fail'
 - 2: 'fail'
 - 3: 'fail'
 - 4: 'fail'
 - 5: 'fail'
 - 6: 'fail'
 - 7: 'fail'
 - 8: 'fail'
 - 9: 'fail'
 - 10: 'fail'
 - 11: 'fail'
 - 12: 'fail'
 - 13: 'fail'
 - 14: 'fail'
 - 15: 'fail'
 - 16: 'fail'
 - 17: 'fail'
 - 18: 'fail'
 - 19: 'fail'
 - 20: 'fail'
 - 21: 'fail'
 - 22: 'fail'
 - 23: 'fail'
 - 24: 'fail'
 - 25: 'fail'
 - 26: 'fail'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
