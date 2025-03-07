# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Statement > For let > Auto ident unary excl complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = !$(100); ; $(1)) $(xyz);
$(a);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const xyz /*:boolean*/ = !tmpUnaryArg;
  $(xyz);
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

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = !$(100);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
let xyz = !tmpUnaryArg;
while (true) {
  $(xyz);
  $(1);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = !a;
  $( b );
  $( 1 );
}
`````

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
