# Preval test case

# unshift.md

> Try escaping > Unshift
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(arr[0]);
    arr.unshift($);
  } catch {
    $('fail');
  }
}
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam /*:primitive*/ = arr[0];
  try {
    $(tmpCalleeParam);
    $dotCall($array_unshift, arr, `unshift`, $);
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
  const tmpCalleeParam = arr[0];
  try {
    $(tmpCalleeParam);
    $dotCall($array_unshift, arr, `unshift`, $);
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
  try {
    $( b );
    $dotCall( $array_unshift, a, "unshift", $ );
  }
  catch (c) {
    $( "fail" );
  }
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_unshift
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: '<$>'
 - 4: '<$>'
 - 5: '<$>'
 - 6: '<$>'
 - 7: '<$>'
 - 8: '<$>'
 - 9: '<$>'
 - 10: '<$>'
 - 11: '<$>'
 - 12: '<$>'
 - 13: '<$>'
 - 14: '<$>'
 - 15: '<$>'
 - 16: '<$>'
 - 17: '<$>'
 - 18: '<$>'
 - 19: '<$>'
 - 20: '<$>'
 - 21: '<$>'
 - 22: '<$>'
 - 23: '<$>'
 - 24: '<$>'
 - 25: '<$>'
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
