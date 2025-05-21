# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Assignments > For let > Auto ident unary tilde complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = ~$(100)); ; $(1)) $(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const xyz /*:number*/ = ~tmpUnaryArg;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const xyz = ~tmpUnaryArg;
while (true) {
  $(xyz);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = ~a;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( b );
  $( 1 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: -101
 - 3: 1
 - 4: -101
 - 5: 1
 - 6: -101
 - 7: 1
 - 8: -101
 - 9: 1
 - 10: -101
 - 11: 1
 - 12: -101
 - 13: 1
 - 14: -101
 - 15: 1
 - 16: -101
 - 17: 1
 - 18: -101
 - 19: 1
 - 20: -101
 - 21: 1
 - 22: -101
 - 23: 1
 - 24: -101
 - 25: 1
 - 26: -101
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
