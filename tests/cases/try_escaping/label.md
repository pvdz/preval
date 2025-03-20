# Preval test case

# label.md

> Try escaping > Label
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
let x = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    A: {
      if (x) break A;
      $(arr[0]);
      arr.reverse();
    }
  } catch {
    $('fail');
  }
  $(2);
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const arr /*:array*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (x) {
    $(2);
  } else {
    const tmpCalleeParam /*:primitive*/ = arr[0];
    try {
      $(tmpCalleeParam);
      arr.reverse();
    } catch (e) {
      $(`fail`);
    }
    $(2);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
const arr = [1, 2, 3];
while (true) {
  if (x) {
    $(2);
  } else {
    const tmpCalleeParam = arr[0];
    try {
      $(tmpCalleeParam);
      arr.reverse();
    } catch (e) {
      $(`fail`);
    }
    $(2);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (a) {
    $( 2 );
  }
  else {
    const c = b[ 0 ];
    try {
      $( c );
      b.reverse();
    }
    catch (d) {
      $( "fail" );
    }
    $( 2 );
  }
}
`````


## Todos triggered


- Support this node type in isFree: LabeledStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - 9: 2
 - 10: 2
 - 11: 2
 - 12: 2
 - 13: 2
 - 14: 2
 - 15: 2
 - 16: 2
 - 17: 2
 - 18: 2
 - 19: 2
 - 20: 2
 - 21: 2
 - 22: 2
 - 23: 2
 - 24: 2
 - 25: 2
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
