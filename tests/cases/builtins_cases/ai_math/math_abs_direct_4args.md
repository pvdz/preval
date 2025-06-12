# Preval test case

# math_abs_direct_4args.md

> Builtins cases > Ai math > Math abs direct 4args
>
> Test Math.abs called directly with four arguments (only first is used)

## Input

`````js filename=intro
$(Math.abs(-12, 0, 5, 9));
// Expected: 12
`````


## Settled


`````js filename=intro
$(12);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(12);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 12 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_abs;
const tmpArgOverflow = -12;
let tmpCalleeParam = $Math_abs(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 12
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
