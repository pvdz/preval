# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a = b?.c.d.e(1)) || (a = b?.c.d.e(1)));
$(a);
`````

## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = tmpObjLitVal$1.e(1);
let tmpClusterSSA_a /*:unknown*/ = tmpChainElementCall;
if (tmpChainElementCall) {
  $(tmpChainElementCall);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = tmpObjLitVal$1.e(1);
  tmpClusterSSA_a = tmpChainElementCall$1;
  $(tmpChainElementCall$1);
}
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpChainElementCall = tmpObjLitVal$1.e(1);
let tmpClusterSSA_a = tmpChainElementCall;
if (tmpChainElementCall) {
  $(tmpChainElementCall);
} else {
  const tmpChainElementCall$1 = tmpObjLitVal$1.e(1);
  tmpClusterSSA_a = tmpChainElementCall$1;
  $(tmpChainElementCall$1);
}
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$((a = b?.c.d.e(1)) || (a = b?.c.d.e(1)));
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
  const tmpChainElementCall = tmpChainElementObject$1.e(1);
  a = tmpChainElementCall;
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp$1 = b;
  const tmpIfTest$1 = tmpChainRootProp$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$5 = tmpChainRootProp$1.c;
    const tmpChainElementObject$7 = tmpChainElementObject$5.d;
    const tmpChainElementCall$1 = tmpChainElementObject$7.e(1);
    tmpNestedComplexRhs = tmpChainElementCall$1;
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { e: $ };
const b = a.e( 1 );
let c = b;
if (b) {
  $( b );
}
else {
  const d = a.e( 1 );
  c = d;
  $( d );
}
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
