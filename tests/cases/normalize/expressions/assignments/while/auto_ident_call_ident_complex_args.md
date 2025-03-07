# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Assignments > While > Auto ident call ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = $($(1), $(2)))) $(100);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
let a /*:unknown*/ = $(tmpCalleeParam, tmpCalleeParam$1);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$2 /*:unknown*/ = $(1);
    const tmpCalleeParam$4 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$2, tmpCalleeParam$4);
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
let a = $($(1), $(2));
if (a) {
  while (true) {
    $(100);
    a = $($(1), $(2));
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
while ((a = $($(1), $(2)))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = $(tmpCalleeParam, tmpCalleeParam$1);
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
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
const b = $( 2 );
let c = $( a, b );
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = $( 1 );
    const e = $( 2 );
    c = $( d, e );
    if (c) {

    }
    else {
      break;
    }
  }
}
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 1, 2
 - 8: 100
 - 9: 1
 - 10: 2
 - 11: 1, 2
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 100
 - 21: 1
 - 22: 2
 - 23: 1, 2
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check