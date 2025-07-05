# Preval test case

# if-no-break.md

> Try escaping > If-no-break
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_NO_UNROLLS_LEFT) {
  const x = $(1);
  try {
    if (x) ;
    else break;
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
while ($LOOP_NO_UNROLLS_LEFT) {
  const x /*:unknown*/ = $(1);
  try {
    if (x) {
      const tmpCalleeParam /*:primitive*/ = arr[0];
      $(tmpCalleeParam);
      $dotCall($array_reverse, arr, `reverse`);
    } else {
      break;
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
      $(arr[0]);
      $dotCall($array_reverse, arr, `reverse`);
    } else {
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
const a = [ 1, 2, 3 ];
while ($LOOP_NO_UNROLLS_LEFT) {
  const b = $( 1 );
  try {
    if (b) {
      const c = a[ 0 ];
      $( c );
      $dotCall( $array_reverse, a, "reverse" );
    }
    else {
      break;
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
while ($LOOP_NO_UNROLLS_LEFT) {
  const x = $(1);
  try {
    if (x) {
      let tmpCalleeParam = arr[0];
      $(tmpCalleeParam);
      const tmpMCF = arr.reverse;
      $dotCall(tmpMCF, arr, `reverse`);
    } else {
      break;
    }
  } catch (e) {
    $(`fail`);
  }
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_reverse
- (todo) support builtin $array_reverse for array escape analysis


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 3
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 3
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 3
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 3
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 3
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 3
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
