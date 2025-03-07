# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident new complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = new ($($))(1)); $(1));
$(a);
`````

## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
new tmpNewCallee(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  const tmpNewCallee$1 /*:unknown*/ = $($);
  new tmpNewCallee$1(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
new tmpNewCallee(1);
while (true) {
  $(1);
  const tmpNewCallee$1 = $($);
  new tmpNewCallee$1(1);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = new ($($))(1))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNewCallee = $($);
  a = new tmpNewCallee(1);
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
new a( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  const b = $( $ );
  new b( 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: '<$>'
 - 5: 1
 - 6: 1
 - 7: '<$>'
 - 8: 1
 - 9: 1
 - 10: '<$>'
 - 11: 1
 - 12: 1
 - 13: '<$>'
 - 14: 1
 - 15: 1
 - 16: '<$>'
 - 17: 1
 - 18: 1
 - 19: '<$>'
 - 20: 1
 - 21: 1
 - 22: '<$>'
 - 23: 1
 - 24: 1
 - 25: '<$>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
- Support this node type in isFree: NewExpression