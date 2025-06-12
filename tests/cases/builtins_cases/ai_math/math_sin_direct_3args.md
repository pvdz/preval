# Preval test case

# math_sin_direct_3args.md

> Builtins cases > Ai math > Math sin direct 3args
>
> Test Math.sin with 3 arguments

## Input

`````js filename=intro
$(Math.sin(0, 2, 3));
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_sin;
const tmpArgOverflow = 0;
let tmpCalleeParam = $Math_sin(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
