# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > For let > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for (let xyz = (a = typeof $(arg)); ; $(1)) $(xyz);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a /*:string*/ = typeof tmpUnaryArg;
  $(a);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
while (true) {
  $(typeof tmpUnaryArg);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = typeof a;
  $( b );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
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
 - 1: 1
 - 2: 'number'
 - 3: 1
 - 4: 'number'
 - 5: 1
 - 6: 'number'
 - 7: 1
 - 8: 'number'
 - 9: 1
 - 10: 'number'
 - 11: 1
 - 12: 'number'
 - 13: 1
 - 14: 'number'
 - 15: 1
 - 16: 'number'
 - 17: 1
 - 18: 'number'
 - 19: 1
 - 20: 'number'
 - 21: 1
 - 22: 'number'
 - 23: 1
 - 24: 'number'
 - 25: 1
 - 26: 'number'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
