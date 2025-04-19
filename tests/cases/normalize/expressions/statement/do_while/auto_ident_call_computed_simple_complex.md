# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident call computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (b[$("$")](1));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpCallCompVal /*:unknown*/ = b[tmpCallCompProp];
const tmpIfTest /*:unknown*/ = $dotCall(tmpCallCompVal, b, undefined, 1);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
    const tmpCallCompVal$1 /*:unknown*/ = b[tmpCallCompProp$1];
    const tmpIfTest$1 /*:unknown*/ = $dotCall(tmpCallCompVal$1, b, undefined, 1);
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


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = $dotCall( c, b, undefined, 1 );
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = $( "$" );
    const f = b[ e ];
    const g = $dotCall( f, b, undefined, 1 );
    if (g) {

    }
    else {
      break;
    }
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````


## Todos triggered


- (todo) objects in isFree check


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
