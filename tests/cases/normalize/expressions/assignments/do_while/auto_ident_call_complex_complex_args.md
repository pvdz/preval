# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > Do while > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($)($(1), $(2))));
$(a);
`````

## Settled


`````js filename=intro
$(100);
const tmpCallCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
let a /*:unknown*/ = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCallCallee$1 /*:unknown*/ = $($);
    const tmpCalleeParam$2 /*:unknown*/ = $(1);
    const tmpCalleeParam$4 /*:unknown*/ = $(2);
    a = tmpCallCallee$1(tmpCalleeParam$2, tmpCalleeParam$4);
    if (a) {
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const tmpCallCallee = $($);
let a = tmpCallCallee($(1), $(2));
if (a) {
  while (true) {
    $(100);
    const tmpCallCallee$1 = $($);
    a = tmpCallCallee$1($(1), $(2));
    if (!a) {
      break;
    }
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $($)($(1), $(2)))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCallCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
let d = a( b, c );
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = $( $ );
    const f = $( 1 );
    const g = $( 2 );
    d = e( f, g );
    if (d) {

    }
    else {
      break;
    }
  }
}
$( d );
`````

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

Todos triggered:
- objects in isFree check