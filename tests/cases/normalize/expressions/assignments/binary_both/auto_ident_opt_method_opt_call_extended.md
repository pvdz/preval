# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Binary both > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a = b?.c.d.e?.(1)) + (a = b?.c.d.e?.(1)));
$(a);
`````

## Settled


`````js filename=intro
let tmpBinBothLhs /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
const tmpObjLitVal$1 /*:object*/ = { e: $ };
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  tmpBinBothLhs = tmpChainElementCall;
}
const tmpChainElementObject$9 /*:unknown*/ = tmpObjLitVal$1.e;
const tmpIfTest$5 /*:boolean*/ = tmpChainElementObject$9 == null;
if (tmpIfTest$5) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
  $(undefined);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpChainElementCall$1;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpChainElementCall$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = undefined;
const tmpIfTest$1 = $ == null;
const tmpObjLitVal$1 = { e: $ };
if (!tmpIfTest$1) {
  tmpBinBothLhs = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
const tmpChainElementObject$9 = tmpObjLitVal$1.e;
if (tmpChainElementObject$9 == null) {
  $(tmpBinBothLhs + undefined);
  $(undefined);
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
  $(tmpBinBothLhs + tmpChainElementCall$1);
  $(tmpChainElementCall$1);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$((a = b?.c.d.e?.(1)) + (a = b?.c.d.e?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpIfTest$1 = tmpChainElementObject$3 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, `e`, 1);
    a = tmpChainElementCall;
  } else {
  }
} else {
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = b;
const tmpIfTest$3 = tmpChainRootProp$1 != null;
if (tmpIfTest$3) {
  const tmpChainElementObject$5 = tmpChainRootProp$1.c;
  const tmpChainElementObject$7 = tmpChainElementObject$5.d;
  const tmpChainElementObject$9 = tmpChainElementObject$7.e;
  const tmpIfTest$5 = tmpChainElementObject$9 != null;
  if (tmpIfTest$5) {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpChainElementObject$7, `e`, 1);
    a = tmpChainElementCall$1;
  } else {
  }
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
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
const e = c.e;
const f = e == null;
if (f) {
  const g = a + undefined;
  $( g );
  $( undefined );
}
else {
  const h = $dotCall( e, c, "e", 1 );
  const i = a + h;
  $( i );
  $( h );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
