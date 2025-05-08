# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > While > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
while ((a = b?.c.d.e(1))) $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
let a /*:unknown*/ = tmpChainElementCall;
if (tmpChainElementCall) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementObject$1 /*:unknown*/ = tmpObjLitVal$1.e;
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, `e`, 1);
    a = tmpChainElementCall$1;
    if (tmpChainElementCall$1) {
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
const tmpObjLitVal$1 = { e: $ };
const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, `e`, 1);
let a = tmpChainElementCall;
if (tmpChainElementCall) {
  while (true) {
    $(100);
    const tmpChainElementCall$1 = tmpObjLitVal$1.e(1);
    a = tmpChainElementCall$1;
    if (!tmpChainElementCall$1) {
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
const a = { e: $ };
const b = $dotCall( $, a, "e", 1 );
let c = b;
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = a.e;
    const e = $dotCall( d, a, "e", 1 );
    c = e;
    if (e) {

    }
    else {
      break;
    }
  }
  $( c );
}
else {
  $( c );
}
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
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
