# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > While > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($)?.(1))) $(100);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  a = $dotCall(tmpChainElementCall, $, undefined, 1);
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementCall$1 /*:unknown*/ = $($);
    const tmpIfTest$2 /*:boolean*/ = tmpChainElementCall$1 == null;
    if (tmpIfTest$2) {
    } else {
      a = $dotCall(tmpChainElementCall$1, $, undefined, 1);
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
const tmpChainElementCall = $($);
if (!(tmpChainElementCall == null)) {
  a = $dotCall(tmpChainElementCall, $, undefined, 1);
}
if (a) {
  while (true) {
    $(100);
    const tmpChainElementCall$1 = $($);
    if (!(tmpChainElementCall$1 == null)) {
      a = $dotCall(tmpChainElementCall$1, $, undefined, 1);
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
const b = $( $ );
const c = b == null;
if (c) {

}
else {
  a = $dotCall( b, $, undefined, 1 );
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = $( $ );
    const e = d == null;
    if (e) {

    }
    else {
      a = $dotCall( d, $, undefined, 1 );
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
