# Preval test case

# let.md

> Try escaping > Let
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
let arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(arr[0]);
    arr.reverse();
    if (arr[0] === $) break;
    arr = [1,2,3];
  } catch {
    $('fail');
  }
}
`````


## Settled


`````js filename=intro
let arr /*:array*/ /*truthy*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam /*:unknown*/ = arr[0];
  try {
    $(tmpCalleeParam);
    $dotCall($array_reverse, arr, `reverse`);
    const tmpBinLhs /*:unknown*/ = arr[0];
    const tmpIfTest /*:boolean*/ = tmpBinLhs === $;
    if (tmpIfTest) {
      break;
    } else {
      arr = [1, 2, 3];
    }
  } catch (e) {
    $(`fail`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let arr = [1, 2, 3];
while (true) {
  const tmpCalleeParam = arr[0];
  try {
    $(tmpCalleeParam);
    $dotCall($array_reverse, arr, `reverse`);
    if (arr[0] === $) {
      break;
    } else {
      arr = [1, 2, 3];
    }
  } catch (e) {
    $(`fail`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 0 ];
  try {
    $( b );
    $dotCall( $array_reverse, a, "reverse" );
    const c = a[ 0 ];
    const d = c === $;
    if (d) {
      break;
    }
    else {
      a = [ 1, 2, 3 ];
    }
  }
  catch (e) {
    $( "fail" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    let tmpCalleeParam = arr[0];
    $(tmpCalleeParam);
    const tmpMCF = arr.reverse;
    $dotCall(tmpMCF, arr, `reverse`);
    const tmpBinLhs = arr[0];
    const tmpIfTest = tmpBinLhs === $;
    if (tmpIfTest) {
      break;
    } else {
      arr = [1, 2, 3];
    }
  } catch (e) {
    $(`fail`);
  }
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
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
