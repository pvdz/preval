# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Statement > Logic or both > Auto ident opt method call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
b?.c.d.e(1) || b?.c.d.e(1);
$(a);
`````

## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = tmpObjLitVal$1.e(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpChainElementCall) {
  $(a);
} else {
  tmpObjLitVal$1.e(1);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpChainElementCall = tmpObjLitVal$1.e(1);
const a = { a: 999, b: 1000 };
if (tmpChainElementCall) {
  $(a);
} else {
  tmpObjLitVal$1.e(1);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
b?.c.d.e(1) || b?.c.d.e(1);
$(a);
`````

## Normalized


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
  const tmpChainElementCall = tmpChainElementObject$1.e(1);
  tmpIfTest = tmpChainElementCall;
} else {
}
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainRootProp$1 = b;
  const tmpIfTest$3 = tmpChainRootProp$1 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$5 = tmpChainRootProp$1.c;
    const tmpChainElementObject$7 = tmpChainElementObject$5.d;
    const tmpChainElementCall$1 = tmpChainElementObject$7.e(1);
    $(a);
  } else {
    $(a);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { e: $ };
const b = a.e( 1 );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c );
}
else {
  a.e( 1 );
  $( c );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
