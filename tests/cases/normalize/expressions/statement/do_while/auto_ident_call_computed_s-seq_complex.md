# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident call computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((1, 2, b)[$("$")](1));
$(a);
`````

## Settled


`````js filename=intro
$(100);
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpIfTest /*:unknown*/ = b[tmpCallCompProp](1);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
    const tmpIfTest$1 /*:unknown*/ = b[tmpCallCompProp$1](1);
    if (tmpIfTest$1) {
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
$(100);
const tmpCallCompProp = $(`\$`);
const b = { $: $ };
if (b[tmpCallCompProp](1)) {
  while (true) {
    $(100);
    const tmpCallCompProp$1 = $(`\$`);
    if (!b[tmpCallCompProp$1](1)) {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((1, 2, b)[$(`\$`)](1)) {
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
  const tmpCallCompObj = b;
  const tmpCallCompProp = $(`\$`);
  const tmpIfTest = tmpCallCompObj[tmpCallCompProp](1);
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
const a = $( "$" );
const b = { $: $ };
const c = b[ a ]( 1 );
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = $( "$" );
    const e = b[ d ]( 1 );
    if (e) {

    }
    else {
      break;
    }
  }
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: '$'
 - 3: 1
 - 4: 100
 - 5: '$'
 - 6: 1
 - 7: 100
 - 8: '$'
 - 9: 1
 - 10: 100
 - 11: '$'
 - 12: 1
 - 13: 100
 - 14: '$'
 - 15: 1
 - 16: 100
 - 17: '$'
 - 18: 1
 - 19: 100
 - 20: '$'
 - 21: 1
 - 22: 100
 - 23: '$'
 - 24: 1
 - 25: 100
 - 26: '$'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
