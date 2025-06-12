# Preval test case

# math_exp_direct_3args.md

> Builtins cases > Ai math > Math exp direct 3args
>
> Test Math.exp called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.exp(2, 0, -1));
// Expected: 7.38905609893065
`````


## Settled


`````js filename=intro
$(7.38905609893065);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(7.38905609893065);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 7.38905609893065 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_exp;
const tmpArgOverflow = 2;
let tmpCalleeParam = $Math_exp(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 7.38905609893065
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
