# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
$((a *= b?.c(1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: $ };
const tmpClusterSSA_tmpBinBothRhs /*:unknown*/ = $dotCall($, b, `c`, 1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a$1 /*:number*/ = a * tmpClusterSSA_tmpBinBothRhs;
$(tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpBinBothRhs = $dotCall($, { c: $ }, `c`, 1);
const tmpClusterSSA_a$1 = { a: 999, b: 1000 } * tmpClusterSSA_tmpBinBothRhs;
$(tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, "c", 1 );
const c = {
  a: 999,
  b: 1000,
};
const d = c * b;
$( d );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, `c`, 1);
  tmpBinBothRhs = tmpChainElementCall;
} else {
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(a);
$(a);
`````


## Todos triggered


None


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
