# Preval test case

# broken_loop_unroll.md

> While > Broken loop unroll
>
> There was a bug in the loop unroll when the while body contains a labeled break.
> The unroll would copy and repeat the break even though the break may exit the loop.

## Input

`````js filename=intro
while (true) {
  $continue: {
    $(1);
    while (true) {
      $(2);
      break $continue;
    }
  }
}
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(1);
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  $( 2 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
