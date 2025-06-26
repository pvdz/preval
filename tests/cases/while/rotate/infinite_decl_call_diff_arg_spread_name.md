# Preval test case

# infinite_decl_call_diff_arg_spread_name.md

> While > Rotate > Infinite decl call diff arg spread name
>
> Rotating statements in an infinite loop

## Input

`````js filename=intro
let s = $('hello');
let t = $('there');
let x = $(1, ...s, 3);
while ($LOOP_UNROLL_10) {
  $(x);
  x = $(1, ...t, 3);
}
$(x); // unreachable
`````


## Settled


`````js filename=intro
const s /*:unknown*/ = $(`hello`);
const t /*:unknown*/ = $(`there`);
let x /*:unknown*/ = $(1, ...s, 3);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(x);
  x = $(1, ...t, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const s = $(`hello`);
const t = $(`there`);
let x = $(1, ...s, 3);
while (true) {
  $(x);
  x = $(1, ...t, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = $( "there" );
let c = $( 1, ...a, 3 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( c );
  c = $( 1, ...b, 3 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let s = $(`hello`);
let t = $(`there`);
let x = $(1, ...s, 3);
while ($LOOP_UNROLL_10) {
  $(x);
  x = $(1, ...t, 3);
}
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) Support this node type in isFree: SpreadElement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'there'
 - 3: 1, 'h', 'e', 'l', 'l', 'o', 3
 - 4: 1
 - 5: 1, 't', 'h', 'e', 'r', 'e', 3
 - 6: 1
 - 7: 1, 't', 'h', 'e', 'r', 'e', 3
 - 8: 1
 - 9: 1, 't', 'h', 'e', 'r', 'e', 3
 - 10: 1
 - 11: 1, 't', 'h', 'e', 'r', 'e', 3
 - 12: 1
 - 13: 1, 't', 'h', 'e', 'r', 'e', 3
 - 14: 1
 - 15: 1, 't', 'h', 'e', 'r', 'e', 3
 - 16: 1
 - 17: 1, 't', 'h', 'e', 'r', 'e', 3
 - 18: 1
 - 19: 1, 't', 'h', 'e', 'r', 'e', 3
 - 20: 1
 - 21: 1, 't', 'h', 'e', 'r', 'e', 3
 - 22: 1
 - 23: 1, 't', 'h', 'e', 'r', 'e', 3
 - 24: 1
 - 25: 1, 't', 'h', 'e', 'r', 'e', 3
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
