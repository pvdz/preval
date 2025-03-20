# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > For let > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = "foo"); ; $(1)) $(xyz);
$(a);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`foo`);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(`foo`);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "foo" );
  $( 1 );
}
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - 2: 1
 - 3: 'foo'
 - 4: 1
 - 5: 'foo'
 - 6: 1
 - 7: 'foo'
 - 8: 1
 - 9: 'foo'
 - 10: 1
 - 11: 'foo'
 - 12: 1
 - 13: 'foo'
 - 14: 1
 - 15: 'foo'
 - 16: 1
 - 17: 'foo'
 - 18: 1
 - 19: 'foo'
 - 20: 1
 - 21: 'foo'
 - 22: 1
 - 23: 'foo'
 - 24: 1
 - 25: 'foo'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
