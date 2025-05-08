# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > For c > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
for (; $(1); b?.c.d.e?.(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$3 /*:boolean*/ = $ == null;
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  if (tmpIfTest$3) {
  } else {
    $dotCall($, tmpObjLitVal$1, `e`, 1);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpChainElementObject$1 /*:unknown*/ = tmpObjLitVal$1.e;
      const tmpIfTest$4 /*:boolean*/ = tmpChainElementObject$1 == null;
      if (tmpIfTest$4) {
      } else {
        $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, `e`, 1);
      }
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
if ($(1)) {
  const tmpIfTest$3 = $ == null;
  const tmpObjLitVal$1 = { e: $ };
  if (!tmpIfTest$3) {
    $dotCall($, tmpObjLitVal$1, `e`, 1);
  }
  while (true) {
    if ($(1)) {
      const tmpChainElementObject$1 = tmpObjLitVal$1.e;
      if (!(tmpChainElementObject$1 == null)) {
        $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, `e`, 1);
      }
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $ == null;
  const c = { e: $ };
  if (b) {

  }
  else {
    $dotCall( $, c, "e", 1 );
  }
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    if (d) {
      const e = c.e;
      const f = e == null;
      if (f) {

      }
      else {
        $dotCall( e, c, "e", 1 );
      }
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
