# Preval test case

# math_acos_direct_4args.md

> Builtins cases > Ai math > Math acos direct 4args
>
> Test Math.acos called directly with four arguments (only first is used)

## Input

`````js filename=intro
$(Math.acos(0, 1, 2, 3));
// Expected: 1.5707963267948966
`````


## Settled


`````js filename=intro
$(1.5707963267948966);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.5707963267948966);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.5707963267948966 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_acos;
const tmpArgOverflow = 0;
let tmpCalleeParam = $Math_acos(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.5707963267948966
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
