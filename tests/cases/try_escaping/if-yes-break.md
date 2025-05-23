# Preval test case

# if-yes-break.md

> Try escaping > If-yes-break
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = $(1);
  try {
    if (x) break;
    $(arr[0]);
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
  const x /*:unknown*/ = $(1);
  try {
    if (x) {
      break;
    } else {
      const tmpCalleeParam /*:primitive*/ = arr[0];
      $(tmpCalleeParam);
      $dotCall($array_reverse, arr, `reverse`);
    }
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
  const x = $(1);
  try {
    if (x) {
      break;
    } else {
      $(arr[0]);
      $dotCall($array_reverse, arr, `reverse`);
    }
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
  const b = $( 1 );
  try {
    if (b) {
      break;
    }
    else {
      const c = a[ 0 ];
      $( c );
      $dotCall( $array_reverse, a, "reverse" );
    }
  }
  catch (d) {
    $( "fail" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = $(1);
  try {
    if (x) {
      break;
    } else {
      let tmpCalleeParam = arr[0];
      $(tmpCalleeParam);
      const tmpMCF = arr.reverse;
      $dotCall(tmpMCF, arr, `reverse`);
    }
  } catch (e) {
    $(`fail`);
  }
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_reverse
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
