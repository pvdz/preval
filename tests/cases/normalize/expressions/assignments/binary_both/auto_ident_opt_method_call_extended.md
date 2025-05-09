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
const tmpBinBothLhs /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
const tmpChainElementObject$9 /*:unknown*/ = tmpObjLitVal$1.e;
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpBinBothLhs = $dotCall($, tmpObjLitVal$1, `e`, 1);
const tmpClusterSSA_a = tmpObjLitVal$1.e(1);
$(tmpBinBothLhs + tmpClusterSSA_a);
$(tmpClusterSSA_a);
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
