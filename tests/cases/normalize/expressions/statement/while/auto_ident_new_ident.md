# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Statement > While > Auto ident new ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while (new $(1)) $(100);
$(a);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  new $(1);
  $(100);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  new $(1);
  $(100);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  new $( 1 );
  $( 100 );
}
`````


## Todos triggered


- Support this node type in isFree: NewExpression


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
