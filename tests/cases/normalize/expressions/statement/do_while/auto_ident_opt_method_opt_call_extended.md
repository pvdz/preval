# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Do while > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (b?.c.d.e?.(1));
$(a);
`````


## Settled


`````js filename=intro
$(100);
let tmpIfTest /*:unknown*/ = undefined;
const tmpIfTest$3 /*:boolean*/ = $ == null;
const tmpObjLitVal$1 /*:object*/ = { e: $ };
if (tmpIfTest$3) {
} else {
  tmpIfTest = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    let tmpIfTest$1 /*:unknown*/ = undefined;
    const tmpChainElementObject$1 /*:unknown*/ = tmpObjLitVal$1.e;
    const tmpIfTest$4 /*:boolean*/ = tmpChainElementObject$1 == null;
    if (tmpIfTest$4) {
    } else {
      tmpIfTest$1 = $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, `e`, 1);
    }
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
let tmpIfTest = undefined;
const tmpIfTest$3 = $ == null;
const tmpObjLitVal$1 = { e: $ };
if (!tmpIfTest$3) {
  tmpIfTest = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
if (tmpIfTest) {
  while (true) {
    $(100);
    let tmpIfTest$1 = undefined;
    const tmpChainElementObject$1 = tmpObjLitVal$1.e;
    if (!(tmpChainElementObject$1 == null)) {
      tmpIfTest$1 = $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, `e`, 1);
    }
    if (!tmpIfTest$1) {
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
let a = undefined;
const b = $ == null;
const c = { e: $ };
if (b) {

}
else {
  a = $dotCall( $, c, "e", 1 );
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    let d = undefined;
    const e = c.e;
    const f = e == null;
    if (f) {

    }
    else {
      d = $dotCall( e, c, "e", 1 );
    }
    if (d) {

    }
    else {
      break;
    }
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
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
