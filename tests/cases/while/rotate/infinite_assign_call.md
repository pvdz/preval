# Preval test case

# infinite_assign_call.md

> While > Rotate > Infinite assign call
>
> Rotating statements in an infinite loop

Note: Because a regex is a stateful object, Preval won't eliminate it.
      Preval should check if the last line before the loop serializes
      to the same string as the last statement in the loop, and in that
      case, rotate-merge them.
      It should do this generically, even if that's gonna be tedious.

## Input

`````js filename=intro
let x = 10;
while (true) {
  $(x);
  x = $(1);       // remove me
  while (true) {
    $(x);
    x = $(1);     // rotate me
  }
}
$(x);             // unreachable
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 10;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(x);
  x = $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 10;
while (true) {
  $(x);
  x = $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 10;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  a = $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 10;
while (true) {
  $(x);
  x = $(1);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
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
