# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Statement > For c > Auto ident new complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); new ($($))(1));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpNewCallee /*:unknown*/ = $($);
  new tmpNewCallee(1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpNewCallee$1 /*:unknown*/ = $($);
      new tmpNewCallee$1(1);
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpNewCallee = $($);
  new tmpNewCallee(1);
  while (true) {
    if ($(1)) {
      const tmpNewCallee$1 = $($);
      new tmpNewCallee$1(1);
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    new ($($))(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpNewCallee = $($);
    new tmpNewCallee(1);
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( $ );
  new b( 1 );
  while ($LOOP_UNROLL_10) {
    const c = $( 1 );
    if (c) {
      const d = $( $ );
      new d( 1 );
    }
    else {
      break;
    }
  }
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: '<$>'
 - 6: 1
 - 7: 1
 - 8: '<$>'
 - 9: 1
 - 10: 1
 - 11: '<$>'
 - 12: 1
 - 13: 1
 - 14: '<$>'
 - 15: 1
 - 16: 1
 - 17: '<$>'
 - 18: 1
 - 19: 1
 - 20: '<$>'
 - 21: 1
 - 22: 1
 - 23: '<$>'
 - 24: 1
 - 25: 1
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Support this node type in isFree: NewExpression