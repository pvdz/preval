# Preval test case

# infinite_assign_str.md

> While > Rotate > Infinite assign str
>
> Rotating statements in an infinite loop

Note: Because a regex is a stateful object, Preval won't eliminate it.
      Preval should check if the last line before the loop serializes
      to the same string as the last statement in the loop, and in that
      case, rotate-merge them.
      It should do this generically, even if that's gonna be tedious.

## Input

`````js filename=intro
let x = 'xyz';
while (true) {
  $(x);
  x = 'foo';      // remove me
  while (true) {
    $(x);
    x = 'foo';    // rotate me
  }
}
$(x);             // unreachable
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`xyz`);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(`foo`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(`xyz`);
  while (true) {
    $(`foo`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "xyz" );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( "foo" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = `xyz`;
while (true) {
  $(x);
  x = `foo`;
  while (true) {
    $(x);
    x = `foo`;
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'xyz'
 - 2: 'foo'
 - 3: 'foo'
 - 4: 'foo'
 - 5: 'foo'
 - 6: 'foo'
 - 7: 'foo'
 - 8: 'foo'
 - 9: 'foo'
 - 10: 'foo'
 - 11: 'foo'
 - 12: 'foo'
 - 13: 'foo'
 - 14: 'foo'
 - 15: 'foo'
 - 16: 'foo'
 - 17: 'foo'
 - 18: 'foo'
 - 19: 'foo'
 - 20: 'foo'
 - 21: 'foo'
 - 22: 'foo'
 - 23: 'foo'
 - 24: 'foo'
 - 25: 'foo'
 - 26: 'foo'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
