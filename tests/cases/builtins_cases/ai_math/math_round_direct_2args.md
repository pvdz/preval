# Preval test case

# math_round_direct_2args.md

> Builtins cases > Ai math > Math round direct 2args
>
> Test Math.round with 2 arguments

## Input

`````js filename=intro
$(Math.round(3.7, 2));
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
const tmpArgOverflow = 3.7;
let tmpCalleeParam = $Math_round(tmpArgOverflow);
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
