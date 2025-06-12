# Preval test case

# math_round_direct_1arg.md

> Builtins cases > Ai math > Math round direct 1arg
>
> Test Math.round with 1 argument

## Input

`````js filename=intro
$(Math.round(3.7));
// Expected: 4
`````


## Settled


`````js filename=intro
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_round;
let tmpCalleeParam = 4;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
