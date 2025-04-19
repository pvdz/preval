# Preval test case

# auto_ident_new_computed_simple_simple2.md

> Normalize > Expressions > Assignments > Do while > Auto ident new computed simple simple2
>
> The init to a should be replaced with undefined

## Input

`````js filename=intro
const useless = new $(1);
let a = useless;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpNestedComplexRhs$2 = new $(1);
  a = tmpNestedComplexRhs$2;
}
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


- (todo) do we want to support NewExpression as expression statement in free loops?


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
