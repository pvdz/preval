# Preval test case

# if-try.md

> Try escaping > If-try
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    if ($) {
      try {
        $(1);
      } catch {
        $(2);
      }
    } else {
      try {
        $(3);
      } catch {
        $(4);
      }
    }
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
  try {
    if ($) {
      try {
        $(1);
      } catch (e) {
        $(2);
      }
    } else {
      try {
        $(3);
      } catch (e$1) {
        $(4);
      }
    }
    const tmpCalleeParam /*:primitive*/ = arr[0];
    $(tmpCalleeParam);
    $dotCall($array_reverse, arr, `reverse`);
  } catch (e$3) {
    $(`fail`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3];
while (true) {
  try {
    if ($) {
      try {
        $(1);
      } catch (e) {
        $(2);
      }
    } else {
      try {
        $(3);
      } catch (e$1) {
        $(4);
      }
    }
    $(arr[0]);
    $dotCall($array_reverse, arr, `reverse`);
  } catch (e$3) {
    $(`fail`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    if ($) {
      try {
        $( 1 );
      }
      catch (b) {
        $( 2 );
      }
    }
    else {
      try {
        $( 3 );
      }
      catch (c) {
        $( 4 );
      }
    }
    const d = a[ 0 ];
    $( d );
    $dotCall( $array_reverse, a, "reverse" );
  }
  catch (e) {
    $( "fail" );
  }
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_reverse
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) Support referencing this builtin in isFree: $


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
