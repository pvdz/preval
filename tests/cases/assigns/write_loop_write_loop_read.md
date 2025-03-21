# Preval test case

# write_loop_write_loop_read.md

> Assigns > Write loop write loop read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
let x = $(10);
while (true) {
  x = $(20, 'set'); // Perfect SSA target
  $(x, 'loop');
}
`````


## Settled


`````js filename=intro
$(10);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpClusterSSA_x /*:unknown*/ = $(20, `set`);
  $(tmpClusterSSA_x, `loop`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
while (true) {
  $($(20, `set`), `loop`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( 20, "set" );
  $( a, "loop" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20, 'set'
 - 3: 20, 'loop'
 - 4: 20, 'set'
 - 5: 20, 'loop'
 - 6: 20, 'set'
 - 7: 20, 'loop'
 - 8: 20, 'set'
 - 9: 20, 'loop'
 - 10: 20, 'set'
 - 11: 20, 'loop'
 - 12: 20, 'set'
 - 13: 20, 'loop'
 - 14: 20, 'set'
 - 15: 20, 'loop'
 - 16: 20, 'set'
 - 17: 20, 'loop'
 - 18: 20, 'set'
 - 19: 20, 'loop'
 - 20: 20, 'set'
 - 21: 20, 'loop'
 - 22: 20, 'set'
 - 23: 20, 'loop'
 - 24: 20, 'set'
 - 25: 20, 'loop'
 - 26: 20, 'set'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
