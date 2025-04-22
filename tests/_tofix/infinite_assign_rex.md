# Preval test case

# infinite_assign_rex.md

> While > Rotate > Infinite assign rex
>
> Rotating statements in an infinite loop

existing test: regression when we changed regex literals to new regexp calls

Note: Because a regex is a stateful object, Preval won't eliminate it.
      Preval should check if the last line before the loop serializes
      to the same string as the last statement in the loop, and in that
      case, rotate-merge them.
      It should do this generically, even if that's gonna be tedious.

## Input

`````js filename=intro
let x = /tmp/;
while (true) {
  $(x);
  x = /tmp/;      // remove me
  while (true) {
    $(x);
    x = /tmp/;    // rotate me
  }
}
$(x);             // unreachable
`````


## Settled


`````js filename=intro
const x /*:regex*/ = new $regex_constructor(`tmp`, ``);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(x);
  let tmpClusterSSA_x /*:regex*/ = new $regex_constructor(`tmp`, ``);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(tmpClusterSSA_x);
    tmpClusterSSA_x = new $regex_constructor(`tmp`, ``);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = new $regex_constructor(`tmp`, ``);
while (true) {
  $(x);
  let tmpClusterSSA_x = new $regex_constructor(`tmp`, ``);
  while (true) {
    $(tmpClusterSSA_x);
    tmpClusterSSA_x = new $regex_constructor(`tmp`, ``);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "tmp", "" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  let b = new $regex_constructor( "tmp", "" );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( b );
    b = new $regex_constructor( "tmp", "" );
  }
}
`````


## Todos triggered


- (todo) Support this node type in isFree: NewExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: {}
 - 3: {}
 - 4: {}
 - 5: {}
 - 6: {}
 - 7: {}
 - 8: {}
 - 9: {}
 - 10: {}
 - 11: {}
 - 12: {}
 - 13: {}
 - 14: {}
 - 15: {}
 - 16: {}
 - 17: {}
 - 18: {}
 - 19: {}
 - 20: {}
 - 21: {}
 - 22: {}
 - 23: {}
 - 24: {}
 - 25: {}
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
