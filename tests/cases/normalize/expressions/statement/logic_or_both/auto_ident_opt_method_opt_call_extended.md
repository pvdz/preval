# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Logic or both > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
b?.c.d.e?.(1) || b?.c.d.e?.(1);
$(a);
`````

## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpIfTest$3 /*:boolean*/ = $ == null;
const tmpObjLitVal$1 /*:object*/ = { e: $ };
if (tmpIfTest$3) {
} else {
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
} else {
  const tmpChainElementObject$9 /*:unknown*/ = tmpObjLitVal$1.e;
  const tmpIfTest$7 /*:boolean*/ = tmpChainElementObject$9 == null;
  if (tmpIfTest$7) {
  } else {
    $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
const tmpIfTest$3 = $ == null;
const tmpObjLitVal$1 = { e: $ };
if (!tmpIfTest$3) {
  tmpIfTest = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
if (!tmpIfTest) {
  const tmpChainElementObject$9 = tmpObjLitVal$1.e;
  if (!(tmpChainElementObject$9 == null)) {
    $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
b?.c.d.e?.(1) || b?.c.d.e?.(1);
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
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpIfTest$3 = tmpChainElementObject$3 != null;
  if (tmpIfTest$3) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, `e`, 1);
    tmpIfTest = tmpChainElementCall;
  } else {
  }
} else {
}
if (tmpIfTest) {
} else {
  const tmpChainRootProp$1 = b;
  const tmpIfTest$5 = tmpChainRootProp$1 != null;
  if (tmpIfTest$5) {
    const tmpChainElementObject$5 = tmpChainRootProp$1.c;
    const tmpChainElementObject$7 = tmpChainElementObject$5.d;
    const tmpChainElementObject$9 = tmpChainElementObject$7.e;
    const tmpIfTest$7 = tmpChainElementObject$9 != null;
    if (tmpIfTest$7) {
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpChainElementObject$7, `e`, 1);
    } else {
    }
  } else {
  }
}
$(a);
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

}
else {
  const e = c.e;
  const f = e == null;
  if (f) {

  }
  else {
    $dotCall( e, c, "e", 1 );
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
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
