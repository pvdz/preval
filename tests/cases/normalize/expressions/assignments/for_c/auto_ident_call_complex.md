# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = $($)(1));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCallComplexCallee /*:unknown*/ = $($);
  let tmpClusterSSA_a /*:unknown*/ = tmpCallComplexCallee(1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCallComplexCallee$1 /*:unknown*/ = $($);
      tmpClusterSSA_a = tmpCallComplexCallee$1(1);
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpCallComplexCallee = $($);
  let tmpClusterSSA_a = tmpCallComplexCallee(1);
  while (true) {
    if ($(1)) {
      const tmpCallComplexCallee$1 = $($);
      tmpClusterSSA_a = tmpCallComplexCallee$1(1);
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  $({ a: 999, b: 1000 });
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $($)(1);
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
    const tmpCallComplexCallee = $($);
    a = tmpCallComplexCallee(1);
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
  let c = b( 1 );
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    if (d) {
      const e = $( $ );
      c = e( 1 );
    }
    else {
      break;
    }
  }
  $( c );
}
else {
  const f = {
    a: 999,
    b: 1000,
  };
  $( f );
}
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
- objects in isFree check