# Preval test case

# sequence_complex_prop_both.md

> Normalize > Expressions > Sequence complex prop both
>
> An assignment with rhs of a property on a sequence that ends with a complex node

Relevant for intermediate artifacts.

## Input

`````js filename=intro
let a = 0, b = 1, c = {x: {y: 10}}, p = {x: 20}, q = 30;
a = (p.x, $(q)).y === ((b = c.x), $(b)).y;
$(a);
`````


## Settled


`````js filename=intro
const tmpCompObj /*:unknown*/ = $(30);
const tmpBinBothLhs /*:unknown*/ = tmpCompObj.y;
const tmpObjLitVal /*:object*/ = { y: 10 };
const tmpCompObj$1 /*:unknown*/ = $(tmpObjLitVal);
const tmpBinBothRhs /*:unknown*/ = tmpCompObj$1.y;
const tmpClusterSSA_a /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(30).y;
$(tmpBinBothLhs === $({ y: 10 }).y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
const b = a.y;
const c = { y: 10 };
const d = $( c );
const e = d.y;
const f = b === e;
$( f );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: { y: '10' }
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
