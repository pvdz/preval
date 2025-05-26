# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Binary both > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a = b?.c.d.e(1)) + (a = b?.c.d.e(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpClusterSSA_tmpBinBothLhs /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
const tmpChainElementObject$9 /*:unknown*/ = tmpObjLitVal$1.e;
const tmpClusterSSA_a$2 /*:unknown*/ = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
const tmpCalleeParam /*:primitive*/ = tmpClusterSSA_tmpBinBothLhs + tmpClusterSSA_a$2;
$(tmpCalleeParam);
$(tmpClusterSSA_a$2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpClusterSSA_tmpBinBothLhs = $dotCall($, tmpObjLitVal$1, `e`, 1);
const tmpClusterSSA_a$2 = tmpObjLitVal$1.e(1);
$(tmpClusterSSA_tmpBinBothLhs + tmpClusterSSA_a$2);
$(tmpClusterSSA_a$2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { e: $ };
const b = $dotCall( $, a, "e", 1 );
const c = a.e;
const d = $dotCall( c, a, "e", 1 );
const e = b + d;
$( e );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

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
  const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, `e`, 1);
  a = tmpChainElementCall;
} else {
}
const tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = b;
const tmpIfTest$1 = tmpChainRootProp$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$5 = tmpChainRootProp$1.c;
  const tmpChainElementObject$7 = tmpChainElementObject$5.d;
  const tmpChainElementObject$9 = tmpChainElementObject$7.e;
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$9, tmpChainElementObject$7, `e`, 1);
  a = tmpChainElementCall$1;
} else {
}
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
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
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
