# Preval test case

# math_cbrt_direct_2args.md

> Builtins cases > Ai math > Math cbrt direct 2args
>
> Test Math.cbrt called directly with two arguments (only first is used)

## Input

`````js filename=intro
$(Math.cbrt(-27, 2));
// Expected: -3
`````


## Settled


`````js filename=intro
$(-3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cbrt;
const tmpArgOverflow = -27;
let tmpCalleeParam = $Math_cbrt(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
