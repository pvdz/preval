# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Assignments > While > Auto ident call computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = b[$("$")](1))) $(100);
$(a);
`````

## Settled


`````js filename=intro
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
let a /*:unknown*/ = b[tmpCallCompProp](1);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
    a = b[tmpCallCompProp$1](1);
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
const tmpCallCompProp = $(`\$`);
const b = { $: $ };
let a = b[tmpCallCompProp](1);
if (a) {
  while (true) {
    $(100);
    const tmpCallCompProp$1 = $(`\$`);
    a = b[tmpCallCompProp$1](1);
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
while ((a = b[$(`\$`)](1))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCompObj = b;
  const tmpCallCompProp = $(`\$`);
  a = tmpCallCompObj[tmpCallCompProp](1);
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
const a = $( "$" );
const b = { $: $ };
let c = b[ a ]( 1 );
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = $( "$" );
    c = b[ d ]( 1 );
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
 - 1: '$'
 - 2: 1
 - 3: 100
 - 4: '$'
 - 5: 1
 - 6: 100
 - 7: '$'
 - 8: 1
 - 9: 100
 - 10: '$'
 - 11: 1
 - 12: 100
 - 13: '$'
 - 14: 1
 - 15: 100
 - 16: '$'
 - 17: 1
 - 18: 100
 - 19: '$'
 - 20: 1
 - 21: 100
 - 22: '$'
 - 23: 1
 - 24: 100
 - 25: '$'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check