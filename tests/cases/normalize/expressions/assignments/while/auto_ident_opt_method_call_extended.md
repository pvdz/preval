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
let a /*:unknown*/ = undefined;
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = tmpObjLitVal$1.e(1);
if (tmpChainElementCall) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementCall$1 /*:unknown*/ = tmpObjLitVal$1.e(1);
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
const tmpObjLitVal$1 = { e: $ };
const tmpChainElementCall = tmpObjLitVal$1.e(1);
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
  $(tmpChainElementCall);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { e: $ };
const c = b.e( 1 );
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = b.e( 1 );
    a = d;
    if (d) {

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
- (todo) Calling a static method on an ident that is not global and not recorded in free loop: tmpObjLitVal$1.e


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
