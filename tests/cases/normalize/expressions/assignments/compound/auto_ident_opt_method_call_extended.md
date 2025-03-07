# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a *= b?.c.d.e(1)));
$(a);
`````

## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = tmpObjLitVal$1.e(1);
const a /*:object*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a$1 /*:number*/ = a * tmpChainElementCall;
$(tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = { e: $ }.e(1);
const tmpClusterSSA_a$1 = { a: 999, b: 1000 } * tmpChainElementCall;
$(tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$((a *= b?.c.d.e(1)));
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementCall = tmpChainElementObject$1.e(1);
  tmpBinBothRhs = tmpChainElementCall;
} else {
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a);
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
const d = c * b;
$( d );
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
