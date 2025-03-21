# Preval test case

# order.md

> Normalize > Hoisting > Var > Order
>
> Check order of moving them up. We try to keep the order, even if it shouldn't matter.

## Input

`````js filename=intro
$(a, b, c);
var a = $();
var c = $();
var b = $();
`````


## Settled


`````js filename=intro
$(undefined, undefined, undefined);
$();
$();
$();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, undefined, undefined);
$();
$();
$();
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined, undefined, undefined );
$();
$();
$();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined, undefined, undefined
 - 2: 
 - 3: 
 - 4: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
