# Preval test case

# auto_ident_unary_minus_simple.md

> Normalize > Expressions > Assignments > For let > Auto ident unary minus simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for (let xyz = (a = -arg); ; $(1)) $(xyz);
$(a, arg);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(-1);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(-1);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( -1 );
  $( 1 );
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1
 - 2: 1
 - 3: -1
 - 4: 1
 - 5: -1
 - 6: 1
 - 7: -1
 - 8: 1
 - 9: -1
 - 10: 1
 - 11: -1
 - 12: 1
 - 13: -1
 - 14: 1
 - 15: -1
 - 16: 1
 - 17: -1
 - 18: 1
 - 19: -1
 - 20: 1
 - 21: -1
 - 22: 1
 - 23: -1
 - 24: 1
 - 25: -1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
