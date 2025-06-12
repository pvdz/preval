# Preval test case

# math_asinh_direct_2args.md

> Builtins cases > Ai math > Math asinh direct 2args
>
> Test Math.asinh called directly with two arguments (only first is used)

## Input

`````js filename=intro
$(Math.asinh(-1, 2));
// Expected: -0.881373587019543
`````


## Settled


`````js filename=intro
$(-0.881373587019543);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-0.881373587019543);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -0.881373587019543 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_asinh;
const tmpArgOverflow = -1;
let tmpCalleeParam = $Math_asinh(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -0.881373587019543
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
