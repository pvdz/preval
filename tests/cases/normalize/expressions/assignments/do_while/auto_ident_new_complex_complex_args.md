# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Do while > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = new ($($))($(1), $(2))));
$(a);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpNewCallee /*:unknown*/ = $($);
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(100);
  const tmpNewCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const a = $( $ );
  const b = $( 1 );
  const c = $( 2 );
  new a( b, c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpNewCallee = $($);
  let tmpCalleeParam = $(1);
  let tmpCalleeParam$1 = $(2);
  a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: 100
 - 7: '<$>'
 - 8: 1
 - 9: 2
 - 10: 1, 2
 - 11: 100
 - 12: '<$>'
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 100
 - 17: '<$>'
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 100
 - 22: '<$>'
 - 23: 1
 - 24: 2
 - 25: 1, 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
