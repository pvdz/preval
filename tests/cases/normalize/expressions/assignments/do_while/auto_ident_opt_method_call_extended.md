# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Do while > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b?.c.d.e(1)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpObjLitVal$1 /*:object*/ = { e: $ };
let a /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementObject$1 /*:unknown*/ = tmpObjLitVal$1.e;
    a = $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, `e`, 1);
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
$(100);
const tmpObjLitVal$1 = { e: $ };
let a = $dotCall($, tmpObjLitVal$1, `e`, 1);
if (a) {
  while (true) {
    $(100);
    a = tmpObjLitVal$1.e(1);
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
$( 100 );
const a = { e: $ };
let b = $dotCall( $, a, "e", 1 );
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const c = a.e;
    b = $dotCall( c, a, "e", 1 );
    if (b) {

    }
    else {
      break;
    }
  }
  $( b );
}
else {
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$3 = tmpChainElementObject$1.e;
    const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, `e`, 1);
    a = tmpChainElementCall;
  } else {
  }
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 100
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
