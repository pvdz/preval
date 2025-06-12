# Preval test case

# math_abs_direct_2args.md

> Builtins cases > Ai math > Math abs direct 2args
>
> Test Math.abs called directly with two arguments (only first is used)

## Input

`````js filename=intro
$(Math.abs(-3, 7));
// Expected: 3
`````


## Settled


`````js filename=intro
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_abs;
const tmpArgOverflow = -3;
let tmpCalleeParam = $Math_abs(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
