# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a = b?.c.d.e?.(1)) && (a = b?.c.d.e?.(1)));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
const tmpObjLitVal$1 /*:object*/ = { e: $ };
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  a = tmpChainElementCall;
  tmpCalleeParam = tmpChainElementCall;
}
if (a) {
  const tmpChainElementObject$9 /*:unknown*/ = tmpObjLitVal$1.e;
  const tmpIfTest$5 /*:boolean*/ = tmpChainElementObject$9 == null;
  if (tmpIfTest$5) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
    $(tmpChainElementCall$1);
    $(tmpChainElementCall$1);
  }
} else {
  $(tmpCalleeParam);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
let tmpCalleeParam = undefined;
const tmpIfTest$1 = $ == null;
const tmpObjLitVal$1 = { e: $ };
if (!tmpIfTest$1) {
  const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, `e`, 1);
  a = tmpChainElementCall;
  tmpCalleeParam = tmpChainElementCall;
}
if (a) {
  const tmpChainElementObject$9 = tmpObjLitVal$1.e;
  if (tmpChainElementObject$9 == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
    $(tmpChainElementCall$1);
    $(tmpChainElementCall$1);
  }
} else {
  $(tmpCalleeParam);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$((a = b?.c.d.e?.(1)) && (a = b?.c.d.e?.(1)));
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
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp$1 = b;
  const tmpIfTest$3 = tmpChainRootProp$1 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$5 = tmpChainRootProp$1.c;
    const tmpChainElementObject$7 = tmpChainElementObject$5.d;
    const tmpChainElementObject$9 = tmpChainElementObject$7.e;
    const tmpIfTest$5 = tmpChainElementObject$9 != null;
    if (tmpIfTest$5) {
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpChainElementObject$7, `e`, 1);
      tmpNestedComplexRhs = tmpChainElementCall$1;
    } else {
    }
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
const c = $ == null;
const d = { e: $ };
if (c) {

}
else {
  const e = $dotCall( $, d, "e", 1 );
  a = e;
  b = e;
}
if (a) {
  const f = d.e;
  const g = f == null;
  if (g) {
    $( undefined );
    $( undefined );
  }
  else {
    const h = $dotCall( f, d, "e", 1 );
    $( h );
    $( h );
  }
}
else {
  $( b );
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
