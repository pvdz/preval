# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
$((a = b?.c(1)) + (a = b?.c(1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const tmpBinBothLhs /*:unknown*/ = $dotCall($, b, `c`, 1);
const tmpChainElementObject$1 /*:unknown*/ = b.c;
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpChainElementObject$1, b, `c`, 1);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: $ };
const tmpBinBothLhs = $dotCall($, b, `c`, 1);
const tmpClusterSSA_a = b.c(1);
$(tmpBinBothLhs + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, "c", 1 );
const c = a.c;
const d = $dotCall( c, a, "c", 1 );
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
