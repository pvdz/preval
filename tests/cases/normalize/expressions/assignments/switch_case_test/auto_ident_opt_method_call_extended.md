# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = b?.c.d.e(1)):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const a /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($dotCall($, { e: $ }, `e`, 1));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { e: $ };
const b = $dotCall( $, a, "e", 1 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, `e`, 1);
  a = tmpChainElementCall;
} else {
}
const tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


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
