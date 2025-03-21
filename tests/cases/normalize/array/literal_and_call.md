# Preval test case

# literal_and_call.md

> Normalize > Array > Literal and call
>
> Make sure empty array works

## Input

`````js filename=intro
$([100, $()]);
`````


## Settled


`````js filename=intro
const tmpArrElement$1 /*:unknown*/ = $();
const tmpCalleeParam /*:array*/ = [100, tmpArrElement$1];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement$1 = $();
$([100, tmpArrElement$1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = [ 100, a ];
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: [100, undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
