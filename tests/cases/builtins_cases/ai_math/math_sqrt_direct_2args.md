# Preval test case

# math_sqrt_direct_2args.md

> Builtins cases > Ai math > Math sqrt direct 2args
>
> Test Math.sqrt with 2 arguments

## Input

`````js filename=intro
$(Math.sqrt(4, 9));
// Expected: 2
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_sqrt;
const tmpArgOverflow = 4;
let tmpCalleeParam = $Math_sqrt(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
