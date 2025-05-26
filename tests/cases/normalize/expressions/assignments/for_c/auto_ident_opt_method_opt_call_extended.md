# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > For c > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
for (; $(1); a = b?.c.d.e?.(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  let tmpClusterSSA_a /*:unknown*/ = undefined;
  const tmpIfTest$3 /*:boolean*/ = $ == null;
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  if (tmpIfTest$3) {
  } else {
    tmpClusterSSA_a = $dotCall($, tmpObjLitVal$1, `e`, 1);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      tmpClusterSSA_a = undefined;
      const tmpChainElementObject$1 /*:unknown*/ = tmpObjLitVal$1.e;
      const tmpIfTest$4 /*:boolean*/ = tmpChainElementObject$1 == null;
      if (tmpIfTest$4) {
      } else {
        tmpClusterSSA_a = $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, `e`, 1);
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  let tmpClusterSSA_a = undefined;
  const tmpIfTest$3 = $ == null;
  const tmpObjLitVal$1 = { e: $ };
  if (!tmpIfTest$3) {
    tmpClusterSSA_a = $dotCall($, tmpObjLitVal$1, `e`, 1);
  }
  while (true) {
    if ($(1)) {
      tmpClusterSSA_a = undefined;
      const tmpChainElementObject$1 = tmpObjLitVal$1.e;
      if (!(tmpChainElementObject$1 == null)) {
        tmpClusterSSA_a = $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, `e`, 1);
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  let b = undefined;
  const c = $ == null;
  const d = { e: $ };
  if (c) {

  }
  else {
    b = $dotCall( $, d, "e", 1 );
  }
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      b = undefined;
      const f = d.e;
      const g = f == null;
      if (g) {

      }
      else {
        b = $dotCall( f, d, "e", 1 );
      }
    }
    else {
      break;
    }
  }
  $( b );
}
else {
  const h = {
    a: 999,
    b: 1000,
  };
  $( h );
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = undefined;
    const tmpChainRootProp = b;
    const tmpIfTest$1 = tmpChainRootProp != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementObject$1 = tmpChainElementObject.d;
      const tmpChainElementObject$3 = tmpChainElementObject$1.e;
      const tmpIfTest$3 = tmpChainElementObject$3 != null;
      if (tmpIfTest$3) {
        const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, `e`, 1);
        a = tmpChainElementCall;
      } else {
      }
    } else {
    }
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
