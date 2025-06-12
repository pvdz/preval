# Preval test case

# math_asinh_direct_1arg.md

> Builtins cases > Ai math > Math asinh direct 1arg
>
> Test Math.asinh called directly with one argument (1)

## Input

`````js filename=intro
$(Math.asinh(1));
// Expected: 0.881373587019543
`````


## Settled


`````js filename=intro
$(0.881373587019543);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.881373587019543);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.881373587019543 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_asinh;
let tmpCalleeParam = 0.881373587019543;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.881373587019543
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
