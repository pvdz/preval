# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Statement > While > Auto ident call complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ($($)($(1), $(2))) $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpCallCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpIfTest /*:unknown*/ = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCallCallee$1 /*:unknown*/ = $($);
    const tmpCalleeParam$2 /*:unknown*/ = $(1);
    const tmpCalleeParam$4 /*:unknown*/ = $(2);
    const tmpIfTest$1 /*:unknown*/ = tmpCallCallee$1(tmpCalleeParam$2, tmpCalleeParam$4);
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
const tmpCallCallee = $($);
if (tmpCallCallee($(1), $(2))) {
  while (true) {
    $(100);
    const tmpCallCallee$1 = $($);
    const tmpCalleeParam$2 = $(1);
    if (!tmpCallCallee$1(tmpCalleeParam$2, $(2))) {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = a( b, c );
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = $( $ );
    const f = $( 1 );
    const g = $( 2 );
    const h = e( f, g );
    if (h) {

    }
    else {
      break;
    }
  }
}
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 100
 - 6: '<$>'
 - 7: 1
 - 8: 2
 - 9: 1, 2
 - 10: 100
 - 11: '<$>'
 - 12: 1
 - 13: 2
 - 14: 1, 2
 - 15: 100
 - 16: '<$>'
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 100
 - 21: '<$>'
 - 22: 1
 - 23: 2
 - 24: 1, 2
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
