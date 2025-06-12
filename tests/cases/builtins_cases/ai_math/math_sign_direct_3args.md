# Preval test case

# math_sign_direct_3args.md

> Builtins cases > Ai math > Math sign direct 3args
>
> Test Math.sign with 3 arguments

## Input

`````js filename=intro
$(Math.sign(-5, 2, 3));
`````


## Settled


`````js filename=intro
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_sign;
const tmpArgOverflow = -5;
let tmpCalleeParam = $Math_sign(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
