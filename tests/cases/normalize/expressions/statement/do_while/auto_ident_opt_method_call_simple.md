# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (b?.c(1));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const b /*:object*/ = { c: $ };
const tmpClusterSSA_tmpIfTest /*:unknown*/ = $dotCall($, b, `c`, 1);
if (tmpClusterSSA_tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementObject$1 /*:unknown*/ = b.c;
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, b, `c`, 1);
    if (tmpClusterSSA_tmpIfTest$1) {
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
const b = { c: $ };
if ($dotCall($, b, `c`, 1)) {
  while (true) {
    $(100);
    if (!b.c(1)) {
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
const a = { c: $ };
const b = $dotCall( $, a, "c", 1 );
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const c = a.c;
    const d = $dotCall( c, a, "c", 1 );
    if (d) {

    }
    else {
      break;
    }
  }
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  let tmpIfTest = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, `c`, 1);
    tmpIfTest = tmpChainElementCall;
  } else {
  }
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


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
