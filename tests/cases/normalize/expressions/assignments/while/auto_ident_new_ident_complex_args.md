# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > While > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = new $($(1), $(2)))) $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
new $(tmpCalleeParam, tmpCalleeParam$1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCalleeParam$2 /*:unknown*/ = $(1);
  const tmpCalleeParam$4 /*:unknown*/ = $(2);
  new $(tmpCalleeParam$2, tmpCalleeParam$4);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
new $(tmpCalleeParam, tmpCalleeParam$1);
while (true) {
  $(100);
  const tmpCalleeParam$2 = $(1);
  const tmpCalleeParam$4 = $(2);
  new $(tmpCalleeParam$2, tmpCalleeParam$4);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
new $( a, b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const c = $( 1 );
  const d = $( 2 );
  new $( c, d );
}
`````


## Todos triggered


- (todo) do we want to support NewExpression as expression statement in free loops?
- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 1, 2
 - 8: 100
 - 9: 1
 - 10: 2
 - 11: 1, 2
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 100
 - 21: 1
 - 22: 2
 - 23: 1, 2
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
