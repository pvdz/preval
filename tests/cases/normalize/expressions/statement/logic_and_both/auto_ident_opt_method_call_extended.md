# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Statement > Logic and both > Auto ident opt method call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
b?.c.d.e(1) && b?.c.d.e(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpClusterSSA_tmpIfTest /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpClusterSSA_tmpIfTest) {
  const tmpChainElementObject$9 /*:unknown*/ = tmpObjLitVal$1.e;
  $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpClusterSSA_tmpIfTest = $dotCall($, tmpObjLitVal$1, `e`, 1);
const a = { a: 999, b: 1000 };
if (tmpClusterSSA_tmpIfTest) {
  tmpObjLitVal$1.e(1);
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
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  const d = a.e;
  $dotCall( d, a, "e", 1 );
  $( c );
}
else {
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = b;
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, `e`, 1);
  tmpIfTest = tmpChainElementCall;
} else {
}
if (tmpIfTest) {
  const tmpChainRootProp$1 = b;
  const tmpIfTest$3 = tmpChainRootProp$1 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$5 = tmpChainRootProp$1.c;
    const tmpChainElementObject$7 = tmpChainElementObject$5.d;
    const tmpChainElementObject$9 = tmpChainElementObject$7.e;
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpChainElementObject$7, `e`, 1);
    $(a);
  } else {
    $(a);
  }
} else {
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
