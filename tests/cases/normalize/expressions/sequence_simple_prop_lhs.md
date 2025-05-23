# Preval test case

# sequence_simple_prop_lhs.md

> Normalize > Expressions > Sequence simple prop lhs
>
> An assignment with rhs of a property on a sequence that ends with a simple node

Relevant for intermediate artifacts.

## Input

`````js filename=intro
let a = 0, b = 1, c = {x: {y: 10}};
a = ((b = c.x), b).y === 'Identifier';
$(a);
`````


## Settled


`````js filename=intro
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 0;
let b = 1;
const tmpObjLitVal = { y: 10 };
let c = { x: tmpObjLitVal };
b = c.x;
const tmpCompObj = b;
const tmpBinLhs = tmpCompObj.y;
a = tmpBinLhs === `Identifier`;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
