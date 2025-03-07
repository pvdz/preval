# Preval test case

# infinite_decl_call_diff_arg_spread.md

> While > Rotate > Infinite decl call diff arg spread
>
> Rotating statements in an infinite loop

## Input

`````js filename=intro
let s = $('hello');
let x = $(1, 2, 3);
while ($LOOP_UNROLL_10) {
  $(x);
  x = $(1, ...s, 3);
}
$(x); // unreachable
`````

## Settled


`````js filename=intro
const s /*:unknown*/ = $(`hello`);
let x /*:unknown*/ = $(1, 2, 3);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(x);
  x = $(1, ...s, 3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const s = $(`hello`);
let x = $(1, 2, 3);
while (true) {
  $(x);
  x = $(1, ...s, 3);
}
`````

## Pre Normal


`````js filename=intro
let s = $(`hello`);
let x = $(1, 2, 3);
while ($LOOP_UNROLL_10) {
  $(x);
  x = $(1, ...s, 3);
}
$(x);
`````

## Normalized


`````js filename=intro
let s = $(`hello`);
let x = $(1, 2, 3);
while ($LOOP_UNROLL_10) {
  $(x);
  x = $(1, ...s, 3);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
let b = $( 1, 2, 3 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( b );
  b = $( 1, ...a, 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'hello'
 - 2: 1, 2, 3
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
