# Preval test case

# math_cos_direct_1arg.md

> Builtins cases > Ai math > Math cos direct 1arg
>
> Test Math.cos called directly with one argument (1)

## Input

`````js filename=intro
$(Math.cos(1));
// Expected: 0.5403023058681398
`````


## Settled


`````js filename=intro
$(0.5403023058681398);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.5403023058681398);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.5403023058681398 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cos;
let tmpCalleeParam = 0.5403023058681398;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.5403023058681398
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
