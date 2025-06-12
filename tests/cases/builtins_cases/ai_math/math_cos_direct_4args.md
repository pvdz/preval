# Preval test case

# math_cos_direct_4args.md

> Builtins cases > Ai math > Math cos direct 4args
>
> Test Math.cos called directly with four arguments (only first is used)

## Input

`````js filename=intro
$(Math.cos(0, 1, 2, 3));
// Expected: 1
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cos;
const tmpArgOverflow = 0;
let tmpCalleeParam = $Math_cos(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
