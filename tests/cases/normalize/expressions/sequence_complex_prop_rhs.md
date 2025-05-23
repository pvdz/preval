# Preval test case

# sequence_complex_prop_rhs.md

> Normalize > Expressions > Sequence complex prop rhs
>
> An assignment with rhs of a property on a sequence that ends with a complex node

Relevant for intermediate artifacts.

## Input

`````js filename=intro
let a = 0, b = 1, c = {x: {y: 10}};
a = 'Identifier' === ((b = c.x), $(b)).y;
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { y: 10 };
const tmpCompObj /*:unknown*/ = $(tmpObjLitVal);
const tmpBinBothRhs /*:unknown*/ = tmpCompObj.y;
const a /*:boolean*/ = `Identifier` === tmpBinBothRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $({ y: 10 }).y;
$(`Identifier` === tmpBinBothRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 10 };
const b = $( a );
const c = b.y;
const d = "Identifier" === c;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 0;
let b = 1;
const tmpObjLitVal = { y: 10 };
let c = { x: tmpObjLitVal };
const tmpBinBothLhs = `Identifier`;
b = c.x;
const tmpCompObj = $(b);
const tmpBinBothRhs = tmpCompObj.y;
a = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '10' }
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
