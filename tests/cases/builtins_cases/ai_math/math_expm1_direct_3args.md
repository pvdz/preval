# Preval test case

# math_expm1_direct_3args.md

> Builtins cases > Ai math > Math expm1 direct 3args
>
> Test Math.expm1 called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.expm1(2, 0, -1));
// Expected: 6.38905609893065
`````


## Settled


`````js filename=intro
$(6.38905609893065);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(6.38905609893065);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 6.38905609893065 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_expm1;
const tmpArgOverflow = 2;
let tmpCalleeParam = $Math_expm1(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 6.38905609893065
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
