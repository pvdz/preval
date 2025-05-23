# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Statement > For let > Auto ident unary simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let xyz = typeof x; ; $(1)) $(xyz);
$(a, x);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`number`);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(`number`);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "number" );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let xyz = typeof x;
while (true) {
  $(xyz);
  $(1);
}
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number'
 - 2: 1
 - 3: 'number'
 - 4: 1
 - 5: 'number'
 - 6: 1
 - 7: 'number'
 - 8: 1
 - 9: 'number'
 - 10: 1
 - 11: 'number'
 - 12: 1
 - 13: 'number'
 - 14: 1
 - 15: 'number'
 - 16: 1
 - 17: 'number'
 - 18: 1
 - 19: 'number'
 - 20: 1
 - 21: 'number'
 - 22: 1
 - 23: 'number'
 - 24: 1
 - 25: 'number'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
