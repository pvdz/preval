# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > For let > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = !$(100)); ; $(1)) $(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
while ($LOOP_NO_UNROLLS_LEFT) {
  const a /*:boolean*/ /*banged*/ = !tmpUnaryArg;
  $(a);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
while (true) {
  $(!tmpUnaryArg);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
while ($LOOP_NO_UNROLLS_LEFT) {
  const b = !a;
  $( b );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: false
 - 3: 1
 - 4: false
 - 5: 1
 - 6: false
 - 7: 1
 - 8: false
 - 9: 1
 - 10: false
 - 11: 1
 - 12: false
 - 13: 1
 - 14: false
 - 15: 1
 - 16: false
 - 17: 1
 - 18: false
 - 19: 1
 - 20: false
 - 21: 1
 - 22: false
 - 23: 1
 - 24: false
 - 25: 1
 - 26: false
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
