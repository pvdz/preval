# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Statement > While > Auto ident call complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($)(1)) $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
const tmpIfTest /*:unknown*/ = tmpCallComplexCallee(1);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCallComplexCallee$1 /*:unknown*/ = $($);
    const tmpIfTest$1 /*:unknown*/ = tmpCallComplexCallee$1(1);
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
const tmpCallComplexCallee = $($);
if (tmpCallComplexCallee(1)) {
  while (true) {
    $(100);
    const tmpCallComplexCallee$1 = $($);
    if (!tmpCallComplexCallee$1(1)) {
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
const b = a( 1 );
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const c = $( $ );
    const d = c( 1 );
    if (d) {

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
 - 1: '<$>'
 - 2: 1
 - 3: 100
 - 4: '<$>'
 - 5: 1
 - 6: 100
 - 7: '<$>'
 - 8: 1
 - 9: 100
 - 10: '<$>'
 - 11: 1
 - 12: 100
 - 13: '<$>'
 - 14: 1
 - 15: 100
 - 16: '<$>'
 - 17: 1
 - 18: 100
 - 19: '<$>'
 - 20: 1
 - 21: 100
 - 22: '<$>'
 - 23: 1
 - 24: 100
 - 25: '<$>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
