# Preval test case

# if-no-expr.md

> Try escaping > If-no-expr
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(0);
  try {
    if ($) {}
    else $(1);
    $(arr[0]);
    arr.reverse();
  } catch {
    $('fail');
  }
}
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(0);
  try {
    if ($) {
    } else {
      $(1);
    }
    const tmpCalleeParam /*:primitive*/ = arr[0];
    $(tmpCalleeParam);
    $dotCall($array_reverse, arr, `reverse`);
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
  $(0);
  try {
    if (!$) {
      $(1);
    }
    $(arr[0]);
    $dotCall($array_reverse, arr, `reverse`);
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
  $( 0 );
  try {
    if ($) {

    }
    else {
      $( 1 );
    }
    const b = a[ 0 ];
    $( b );
    $dotCall( $array_reverse, a, "reverse" );
  }
  catch (c) {
    $( "fail" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(0);
  try {
    if ($) {
    } else {
      $(1);
    }
    let tmpCalleeParam = arr[0];
    $(tmpCalleeParam);
    const tmpMCF = arr.reverse;
    $dotCall(tmpMCF, arr, `reverse`);
  } catch (e) {
    $(`fail`);
  }
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_reverse
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 0
 - 4: 3
 - 5: 0
 - 6: 1
 - 7: 0
 - 8: 3
 - 9: 0
 - 10: 1
 - 11: 0
 - 12: 3
 - 13: 0
 - 14: 1
 - 15: 0
 - 16: 3
 - 17: 0
 - 18: 1
 - 19: 0
 - 20: 3
 - 21: 0
 - 22: 1
 - 23: 0
 - 24: 3
 - 25: 0
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
