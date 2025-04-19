# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > While > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
while ((a = b?.c(1))) $(100);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = $dotCall($, b, `c`, 1);
if (tmpChainElementCall) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementObject$1 /*:unknown*/ = b.c;
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, b, `c`, 1);
    a = tmpChainElementCall$1;
    if (tmpChainElementCall$1) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(tmpChainElementCall);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { c: $ };
const tmpChainElementCall = $dotCall($, b, `c`, 1);
if (tmpChainElementCall) {
  while (true) {
    $(100);
    const tmpChainElementCall$1 = b.c(1);
    a = tmpChainElementCall$1;
    if (!tmpChainElementCall$1) {
      break;
    }
  }
  $(a);
} else {
  $(tmpChainElementCall);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { c: $ };
const c = $dotCall( $, b, "c", 1 );
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = b.c;
    const e = $dotCall( d, b, "c", 1 );
    a = e;
    if (e) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( c );
}
`````


## Todos triggered


- (todo) objects in isFree check
- (todo) regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
