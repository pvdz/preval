# Preval test case

# math_acos_direct_2args.md

> Builtins cases > Ai math > Math acos direct 2args
>
> Test Math.acos called directly with two arguments (only first is used)

## Input

`````js filename=intro
$(Math.acos(-1, 2));
// Expected: 3.141592653589793
`````


## Settled


`````js filename=intro
$(3.141592653589793);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3.141592653589793);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3.141592653589793 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_acos;
const tmpArgOverflow = -1;
let tmpCalleeParam = $Math_acos(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3.141592653589793
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
