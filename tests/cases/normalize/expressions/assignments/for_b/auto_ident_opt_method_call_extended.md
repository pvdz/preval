# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > For b > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
for (; (a = b?.c.d.e(1)); $(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
let a /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
if (a) {
  while ($LOOP_UNROLL_10) {
    $(1);
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
const tmpObjLitVal$1 = { e: $ };
let a = $dotCall($, tmpObjLitVal$1, `e`, 1);
if (a) {
  while (true) {
    $(1);
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
const a = { e: $ };
let b = $dotCall( $, a, "e", 1 );
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
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


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check
- (todo) regular property access of an ident feels tricky;


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
