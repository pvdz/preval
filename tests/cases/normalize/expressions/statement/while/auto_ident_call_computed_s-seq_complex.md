# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Statement > While > Auto ident call computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((1, 2, b)[$("$")](1)) $(100);
$(a);
`````


## Settled


`````js filename=intro
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


## PST Settled
With rename=true

`````js filename=intro
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


## Todos triggered


- objects in isFree check


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
