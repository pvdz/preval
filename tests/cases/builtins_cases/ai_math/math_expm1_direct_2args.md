# Preval test case

# math_expm1_direct_2args.md

> Builtins cases > Ai math > Math expm1 direct 2args
>
> Test Math.expm1 called directly with two arguments (only first is used)

## Input

`````js filename=intro
$(Math.expm1(-1, 2));
// Expected: -0.6321205588285577
`````


## Settled


`````js filename=intro
$(-0.6321205588285577);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-0.6321205588285577);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -0.6321205588285577 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_expm1;
const tmpArgOverflow = -1;
let tmpCalleeParam = $Math_expm1(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -0.6321205588285577
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
