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
const a /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(a);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 0;
let b = 1;
const tmpObjLitVal = { y: 10 };
let c = { x: tmpObjLitVal };
let p = { x: 20 };
let q = 30;
p.x;
const tmpCompObj = $(q);
const tmpBinBothLhs = tmpCompObj.y;
b = c.x;
const tmpCompObj$1 = $(b);
const tmpBinBothRhs = tmpCompObj$1.y;
a = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


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
