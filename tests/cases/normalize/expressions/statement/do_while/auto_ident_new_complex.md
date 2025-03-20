# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident new complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while (new ($($))(1));
$(a);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpNewCallee /*:unknown*/ = $($);
  new tmpNewCallee(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(100);
  const tmpNewCallee = $($);
  new tmpNewCallee(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const a = $( $ );
  new a( 1 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 100
 - 5: '<$>'
 - 6: 1
 - 7: 100
 - 8: '<$>'
 - 9: 1
 - 10: 100
 - 11: '<$>'
 - 12: 1
 - 13: 100
 - 14: '<$>'
 - 15: 1
 - 16: 100
 - 17: '<$>'
 - 18: 1
 - 19: 100
 - 20: '<$>'
 - 21: 1
 - 22: 100
 - 23: '<$>'
 - 24: 1
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
