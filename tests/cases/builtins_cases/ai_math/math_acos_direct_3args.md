# Preval test case

# math_acos_direct_3args.md

> Builtins cases > Ai math > Math acos direct 3args
>
> Test Math.acos called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.acos(1, 0, -1));
// Expected: 0
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_acos;
const tmpArgOverflow = 1;
let tmpCalleeParam = $Math_acos(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
