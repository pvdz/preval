# Preval test case

# spread_member_call.md

> Normalize > Array > Spread member call
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
$([...true.toString()]);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`t`, `r`, `u`, `e`];
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $boolean_toString;
const tmpArrSpread = `true`;
let tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement


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
