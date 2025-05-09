# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > For b > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $($)?.($(1)); $(1));
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(1);
  tmpIfTest = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam);
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1);
    let tmpIfTest$2 /*:unknown*/ = undefined;
    const tmpChainElementCall$1 /*:unknown*/ = $($);
    const tmpIfTest$4 /*:boolean*/ = tmpChainElementCall$1 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpCalleeParam$1 /*:unknown*/ = $(1);
      tmpIfTest$2 = $dotCall(tmpChainElementCall$1, $, undefined, tmpCalleeParam$1);
    }
    if (tmpIfTest$2) {
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
let tmpIfTest = undefined;
const tmpChainElementCall = $($);
if (!(tmpChainElementCall == null)) {
  tmpIfTest = $dotCall(tmpChainElementCall, $, undefined, $(1));
}
if (tmpIfTest) {
  while (true) {
    $(1);
    let tmpIfTest$2 = undefined;
    const tmpChainElementCall$1 = $($);
    if (!(tmpChainElementCall$1 == null)) {
      tmpIfTest$2 = $dotCall(tmpChainElementCall$1, $, undefined, $(1));
    }
    if (!tmpIfTest$2) {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
if (c) {

}
else {
  const d = $( 1 );
  a = $dotCall( b, $, undefined, d );
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    let e = undefined;
    const f = $( $ );
    const g = f == null;
    if (g) {

    }
    else {
      const h = $( 1 );
      e = $dotCall( f, $, undefined, h );
    }
    if (e) {

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


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: '<$>'
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: '<$>'
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: '<$>'
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: '<$>'
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: '<$>'
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: '<$>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
