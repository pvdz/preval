# Preval test case

# infinite_decl_call_spread.md

> While > Rotate > Infinite decl call spread
>
> Rotating statements in an infinite loop

Note: Because a regex is a stateful object, Preval won't eliminate it.
      Preval should check if the last line before the loop serializes
      to the same string as the last statement in the loop, and in that
      case, rotate-merge them.
      It should do this generically, even if that's gonna be tedious.

## Input

`````js filename=intro
const s = $('hello');
let x = $(1, ...s, 3);
while ($LOOP_UNROLL_10) {
  $(x);
  x = $(1, ...s, 3);
}
$(x); // unreachable
`````


## Settled


`````js filename=intro
const s /*:unknown*/ = $(`hello`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpClusterSSA_x /*:unknown*/ = $(1, ...s, 3);
  $(tmpClusterSSA_x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const s = $(`hello`);
while (true) {
  $($(1, ...s, 3));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = $( 1, ...a, 3 );
  $( b );
}
`````


## Todos triggered


- (todo) Support this node type in isFree: SpreadElement
- (todo) - at least one of the frfr args was not isFree, bailing


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 1, 'h', 'e', 'l', 'l', 'o', 3
 - 3: 1
 - 4: 1, 'h', 'e', 'l', 'l', 'o', 3
 - 5: 1
 - 6: 1, 'h', 'e', 'l', 'l', 'o', 3
 - 7: 1
 - 8: 1, 'h', 'e', 'l', 'l', 'o', 3
 - 9: 1
 - 10: 1, 'h', 'e', 'l', 'l', 'o', 3
 - 11: 1
 - 12: 1, 'h', 'e', 'l', 'l', 'o', 3
 - 13: 1
 - 14: 1, 'h', 'e', 'l', 'l', 'o', 3
 - 15: 1
 - 16: 1, 'h', 'e', 'l', 'l', 'o', 3
 - 17: 1
 - 18: 1, 'h', 'e', 'l', 'l', 'o', 3
 - 19: 1
 - 20: 1, 'h', 'e', 'l', 'l', 'o', 3
 - 21: 1
 - 22: 1, 'h', 'e', 'l', 'l', 'o', 3
 - 23: 1
 - 24: 1, 'h', 'e', 'l', 'l', 'o', 3
 - 25: 1
 - 26: 1, 'h', 'e', 'l', 'l', 'o', 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
