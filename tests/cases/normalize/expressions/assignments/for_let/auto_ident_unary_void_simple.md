# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > For let > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for (let xyz = (a = void arg); ; $(1)) $(xyz);
$(a, arg);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(undefined);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(undefined);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( undefined );
  $( 1 );
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 1
 - 3: undefined
 - 4: 1
 - 5: undefined
 - 6: 1
 - 7: undefined
 - 8: 1
 - 9: undefined
 - 10: 1
 - 11: undefined
 - 12: 1
 - 13: undefined
 - 14: 1
 - 15: undefined
 - 16: 1
 - 17: undefined
 - 18: 1
 - 19: undefined
 - 20: 1
 - 21: undefined
 - 22: 1
 - 23: undefined
 - 24: 1
 - 25: undefined
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
