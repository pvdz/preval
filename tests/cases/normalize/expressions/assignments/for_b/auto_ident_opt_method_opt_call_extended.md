# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > For b > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
for (; (a = b?.c.d.e?.(1)); $(1));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest$3 /*:boolean*/ = $ == null;
const tmpObjLitVal$1 /*:object*/ = { e: $ };
if (tmpIfTest$3) {
} else {
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  a = tmpChainElementCall;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpChainElementObject$1 /*:unknown*/ = tmpObjLitVal$1.e;
    const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
    if (tmpIfTest$1) {
    } else {
      const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, `e`, 1);
      a = tmpChainElementCall$1;
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
const tmpIfTest$3 = $ == null;
const tmpObjLitVal$1 = { e: $ };
if (!tmpIfTest$3) {
  a = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
if (a) {
  while (true) {
    $(1);
    const tmpChainElementObject$1 = tmpObjLitVal$1.e;
    if (!(tmpChainElementObject$1 == null)) {
      a = $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, `e`, 1);
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
const b = $ == null;
const c = { e: $ };
if (b) {

}
else {
  const d = $dotCall( $, c, "e", 1 );
  a = d;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const e = c.e;
    const f = e == null;
    if (f) {

    }
    else {
      const g = $dotCall( e, c, "e", 1 );
      a = g;
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


- objects in isFree check
- regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
