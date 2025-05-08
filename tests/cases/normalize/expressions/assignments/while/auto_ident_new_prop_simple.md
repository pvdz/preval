# Preval test case

# auto_ident_new_prop_simple.md

> Normalize > Expressions > Assignments > While > Auto ident new prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = new b.$(1))) $(100);
$(a);
`````


## Settled


`````js filename=intro
new $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  new $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
new $(1);
while (true) {
  $(100);
  new $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
new $( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  new $( 1 );
}
`````


## Todos triggered


- (todo) Support this node type in isFree: NewExpression
- (todo) do we want to support NewExpression as expression statement in free loops?
- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
