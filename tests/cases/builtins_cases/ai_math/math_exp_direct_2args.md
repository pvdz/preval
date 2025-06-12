# Preval test case

# math_exp_direct_2args.md

> Builtins cases > Ai math > Math exp direct 2args
>
> Test Math.exp called directly with two arguments (only first is used)

## Input

`````js filename=intro
$(Math.exp(-1, 2));
// Expected: 0.36787944117144233
`````


## Settled


`````js filename=intro
$(0.36787944117144233);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.36787944117144233);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.36787944117144233 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_exp;
const tmpArgOverflow = -1;
let tmpCalleeParam = $Math_exp(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.36787944117144233
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
