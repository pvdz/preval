# Preval test case

# throw.md

> Try escaping > Throw
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    throw $('test');
    $(arr[0]);
    arr.reverse();
  } catch {
    $('fail');
  }
}
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpThrowArg /*:unknown*/ = $(`test`);
    throw tmpThrowArg;
  } catch (e) {
    $(`fail`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  try {
    const tmpThrowArg = $(`test`);
    throw tmpThrowArg;
  } catch (e) {
    $(`fail`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const a = $( "test" );
    throw a;
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
 - 1: 'test'
 - 2: 'fail'
 - 3: 'test'
 - 4: 'fail'
 - 5: 'test'
 - 6: 'fail'
 - 7: 'test'
 - 8: 'fail'
 - 9: 'test'
 - 10: 'fail'
 - 11: 'test'
 - 12: 'fail'
 - 13: 'test'
 - 14: 'fail'
 - 15: 'test'
 - 16: 'fail'
 - 17: 'test'
 - 18: 'fail'
 - 19: 'test'
 - 20: 'fail'
 - 21: 'test'
 - 22: 'fail'
 - 23: 'test'
 - 24: 'fail'
 - 25: 'test'
 - 26: 'fail'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
