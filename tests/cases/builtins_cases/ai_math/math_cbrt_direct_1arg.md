# Preval test case

# math_cbrt_direct_1arg.md

> Builtins cases > Ai math > Math cbrt direct 1arg
>
> Test Math.cbrt called directly with one argument (8)

## Input

`````js filename=intro
$(Math.cbrt(8));
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
const tmpMCF = $Math_cbrt;
let tmpCalleeParam = 2;
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
