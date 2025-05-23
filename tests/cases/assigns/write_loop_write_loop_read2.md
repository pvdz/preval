# Preval test case

# write_loop_write_loop_read2.md

> Assigns > Write loop write loop read2
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
let i = 0;
let x = $(10);
while (true) {
  x = $(++i, 'set'); // Perfect SSA target
  $(x, 'loop');
}
`````


## Settled


`````js filename=intro
let i /*:number*/ = 0;
$(10);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  i = i + 1;
  const x /*:unknown*/ = $(i, `set`);
  $(x, `loop`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let i = 0;
$(10);
while (true) {
  i = i + 1;
  $($(i, `set`), `loop`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
$( 10 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  a = a + 1;
  const b = $( a, "set" );
  $( b, "loop" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let i = 0;
let x = $(10);
while (true) {
  const tmpPostUpdArgIdent = $coerce(i, `number`);
  i = tmpPostUpdArgIdent + 1;
  let tmpCalleeParam = i;
  x = $(i, `set`);
  $(x, `loop`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 1, 'set'
 - 3: 1, 'loop'
 - 4: 2, 'set'
 - 5: 2, 'loop'
 - 6: 3, 'set'
 - 7: 3, 'loop'
 - 8: 4, 'set'
 - 9: 4, 'loop'
 - 10: 5, 'set'
 - 11: 5, 'loop'
 - 12: 6, 'set'
 - 13: 6, 'loop'
 - 14: 7, 'set'
 - 15: 7, 'loop'
 - 16: 8, 'set'
 - 17: 8, 'loop'
 - 18: 9, 'set'
 - 19: 9, 'loop'
 - 20: 10, 'set'
 - 21: 10, 'loop'
 - 22: 11, 'set'
 - 23: 11, 'loop'
 - 24: 12, 'set'
 - 25: 12, 'loop'
 - 26: 13, 'set'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
