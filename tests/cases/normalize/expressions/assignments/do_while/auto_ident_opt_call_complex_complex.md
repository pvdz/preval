# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($)?.($(1))));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
$(100);
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(1);
  a = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam);
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementCall$1 /*:unknown*/ = $($);
    const tmpIfTest$2 /*:boolean*/ = tmpChainElementCall$1 == null;
    if (tmpIfTest$2) {
    } else {
      const tmpCalleeParam$1 /*:unknown*/ = $(1);
      a = $dotCall(tmpChainElementCall$1, $, undefined, tmpCalleeParam$1);
    }
    if (a) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
$(100);
const tmpChainElementCall = $($);
if (!(tmpChainElementCall == null)) {
  a = $dotCall(tmpChainElementCall, $, undefined, $(1));
}
if (a) {
  while (true) {
    $(100);
    const tmpChainElementCall$1 = $($);
    if (!(tmpChainElementCall$1 == null)) {
      a = $dotCall(tmpChainElementCall$1, $, undefined, $(1));
    }
    if (!a) {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
$( 100 );
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
    $( 100 );
    const e = $( $ );
    const f = e == null;
    if (f) {

    }
    else {
      const g = $( 1 );
      a = $dotCall( e, $, undefined, g );
    }
    if (a) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: '<$>'
 - 7: 1
 - 8: 1
 - 9: 100
 - 10: '<$>'
 - 11: 1
 - 12: 1
 - 13: 100
 - 14: '<$>'
 - 15: 1
 - 16: 1
 - 17: 100
 - 18: '<$>'
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: '<$>'
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
