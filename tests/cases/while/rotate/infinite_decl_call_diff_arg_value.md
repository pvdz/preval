# Preval test case

# infinite_decl_call_diff_arg_value.md

> While > Rotate > Infinite decl call diff arg value
>
> Rotating statements in an infinite loop

## Input

`````js filename=intro
let x = $(1, 2, 3);
while ($LOOP_UNROLLS_LEFT_10) {
  $(x);
  x = $(1, 3, 3);
}
$(x); // unreachable
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(1, 2, 3);
while ($LOOP_NO_UNROLLS_LEFT) {
  $(x);
  x = $(1, 3, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(1, 2, 3);
while (true) {
  $(x);
  x = $(1, 3, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 1, 2, 3 );
while ($LOOP_NO_UNROLLS_LEFT) {
  $( a );
  a = $( 1, 3, 3 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(1, 2, 3);
while ($LOOP_UNROLLS_LEFT_10) {
  $(x);
  x = $(1, 3, 3);
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
 - 3: 1, 3, 3
 - 4: 1
 - 5: 1, 3, 3
 - 6: 1
 - 7: 1, 3, 3
 - 8: 1
 - 9: 1, 3, 3
 - 10: 1
 - 11: 1, 3, 3
 - 12: 1
 - 13: 1, 3, 3
 - 14: 1
 - 15: 1, 3, 3
 - 16: 1
 - 17: 1, 3, 3
 - 18: 1
 - 19: 1, 3, 3
 - 20: 1
 - 21: 1, 3, 3
 - 22: 1
 - 23: 1, 3, 3
 - 24: 1
 - 25: 1, 3, 3
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
