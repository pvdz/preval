# Preval test case

# object_complex.md

> Normalize > While > Test > Object complex
>
> Certain test values can be statically determined to be true or false

## Input

`````js filename=intro
while ({a: $(1), b: $(2)}) {
  $('loop');
}
$('after');
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  $(2);
  $(`loop`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(1);
  $(2);
  $(`loop`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  $( 2 );
  $( "loop" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'loop'
 - 4: 1
 - 5: 2
 - 6: 'loop'
 - 7: 1
 - 8: 2
 - 9: 'loop'
 - 10: 1
 - 11: 2
 - 12: 'loop'
 - 13: 1
 - 14: 2
 - 15: 'loop'
 - 16: 1
 - 17: 2
 - 18: 'loop'
 - 19: 1
 - 20: 2
 - 21: 'loop'
 - 22: 1
 - 23: 2
 - 24: 'loop'
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
