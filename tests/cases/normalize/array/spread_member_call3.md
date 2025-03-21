# Preval test case

# spread_member_call3.md

> Normalize > Array > Spread member call3
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
const tmpArrSpread = true.toString();
const tmpCalleeParam = [ ...tmpArrSpread ];
$(tmpCalleeParam);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`t`, `r`, `u`, `e`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`t`, `r`, `u`, `e`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "t", "r", "u", "e" ];
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['t', 'r', 'u', 'e']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
