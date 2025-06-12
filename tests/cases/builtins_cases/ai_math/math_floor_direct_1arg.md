# Preval test case

# math_floor_direct_1arg.md

> Builtins cases > Ai math > Math floor direct 1arg
>
> Test Math.floor called directly with one argument (1.7)

## Input

`````js filename=intro
$(Math.floor(1.7));
// Expected: 1
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_floor;
let tmpCalleeParam = 1;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
