# Preval test case

# infinite_decl_prim.md

> While > Rotate > Infinite decl prim
>
> Rotating statements in an infinite loop

Note: Because a regex is a stateful object, Preval won't eliminate it.
      Preval should check if the last line before the loop serializes
      to the same string as the last statement in the loop, and in that
      case, rotate-merge them.
      It should do this generically, even if that's gonna be tedious.

## Input

`````js filename=intro
let x = 20;
while ($LOOP_UNROLLS_LEFT_10) {
  $(x);
  x = 20;
}
$(x); // unreachable
`````


## Settled


`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  $(20);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(20);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  $( 20 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 20;
while ($LOOP_UNROLLS_LEFT_10) {
  $(x);
  x = 20;
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 20
 - 2: 20
 - 3: 20
 - 4: 20
 - 5: 20
 - 6: 20
 - 7: 20
 - 8: 20
 - 9: 20
 - 10: 20
 - 11: 20
 - 12: 20
 - 13: 20
 - 14: 20
 - 15: 20
 - 16: 20
 - 17: 20
 - 18: 20
 - 19: 20
 - 20: 20
 - 21: 20
 - 22: 20
 - 23: 20
 - 24: 20
 - 25: 20
 - 26: 20
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
