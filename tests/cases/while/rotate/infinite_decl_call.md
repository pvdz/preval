# Preval test case

# infinite_decl_call.md

> While > Rotate > Infinite decl call
>
> Rotating statements in an infinite loop

Note: Because a regex is a stateful object, Preval won't eliminate it.
      Preval should check if the last line before the loop serializes
      to the same string as the last statement in the loop, and in that
      case, rotate-merge them.
      It should do this generically, even if that's gonna be tedious.

## Input

`````js filename=intro
let x = $(1, 2, 3);
while ($LOOP_UNROLL_10) {
  $(x);
  x = $(1, 2, 3);
}
$(x); // unreachable
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x /*:unknown*/ = $(1, 2, 3);
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $($(1, 2, 3));
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( 1, 2, 3 );
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
while ($LOOP_UNROLL_10) {
  x = $(1, 2, 3);
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 2, 3
 - 2: 1
 - 3: 1, 2, 3
 - 4: 1
 - 5: 1, 2, 3
 - 6: 1
 - 7: 1, 2, 3
 - 8: 1
 - 9: 1, 2, 3
 - 10: 1
 - 11: 1, 2, 3
 - 12: 1
 - 13: 1, 2, 3
 - 14: 1
 - 15: 1, 2, 3
 - 16: 1
 - 17: 1, 2, 3
 - 18: 1
 - 19: 1, 2, 3
 - 20: 1
 - 21: 1, 2, 3
 - 22: 1
 - 23: 1, 2, 3
 - 24: 1
 - 25: 1, 2, 3
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
