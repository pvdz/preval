# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Statement > While > Auto ident new complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while (new ($($))($(1), $(2))) $(100);
$(a);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpNewCallee /*:unknown*/ = $($);
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  $(100);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  const tmpNewCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  $(100);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( $ );
  const b = $( 1 );
  const c = $( 2 );
  new a( b, c );
  $( 100 );
}
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 100
 - 6: '<$>'
 - 7: 1
 - 8: 2
 - 9: 1, 2
 - 10: 100
 - 11: '<$>'
 - 12: 1
 - 13: 2
 - 14: 1, 2
 - 15: 100
 - 16: '<$>'
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 100
 - 21: '<$>'
 - 22: 1
 - 23: 2
 - 24: 1, 2
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
