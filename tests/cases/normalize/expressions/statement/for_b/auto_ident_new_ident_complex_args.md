# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > For b > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; new $($(1), $(2)); $(1));
$(a);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  new $(tmpCalleeParam, tmpCalleeParam$1);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  new $(tmpCalleeParam, tmpCalleeParam$1);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( 1 );
  const b = $( 2 );
  new $( a, b );
  $( 1 );
}
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 1, 2
 - 8: 1
 - 9: 1
 - 10: 2
 - 11: 1, 2
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 1
 - 21: 1
 - 22: 2
 - 23: 1, 2
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
