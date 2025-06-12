# Preval test case

# math_cbrt_direct_3args.md

> Builtins cases > Ai math > Math cbrt direct 3args
>
> Test Math.cbrt called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.cbrt(64, 0, -1));
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
const tmpMCF = $Math_cbrt;
const tmpArgOverflow = 64;
let tmpCalleeParam = $Math_cbrt(tmpArgOverflow);
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
