# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Statement > For let > Auto ident array simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = [1, 2, 3]; ; $(1)) $(xyz);
$(a);
`````


## Settled


`````js filename=intro
const xyz /*:array*/ /*truthy*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const xyz = [1, 2, 3];
while (true) {
  $(xyz);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = [1, 2, 3];
while (true) {
  $(xyz);
  $(1);
}
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 1
 - 3: [1, 2, 3]
 - 4: 1
 - 5: [1, 2, 3]
 - 6: 1
 - 7: [1, 2, 3]
 - 8: 1
 - 9: [1, 2, 3]
 - 10: 1
 - 11: [1, 2, 3]
 - 12: 1
 - 13: [1, 2, 3]
 - 14: 1
 - 15: [1, 2, 3]
 - 16: 1
 - 17: [1, 2, 3]
 - 18: 1
 - 19: [1, 2, 3]
 - 20: 1
 - 21: [1, 2, 3]
 - 22: 1
 - 23: [1, 2, 3]
 - 24: 1
 - 25: [1, 2, 3]
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
