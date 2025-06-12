# Preval test case

# math_cos_direct_3args.md

> Builtins cases > Ai math > Math cos direct 3args
>
> Test Math.cos called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.cos(2, 0, -1));
// Expected: -0.4161468365471424
`````


## Settled


`````js filename=intro
$(-0.4161468365471424);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-0.4161468365471424);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -0.4161468365471424 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cos;
const tmpArgOverflow = 2;
let tmpCalleeParam = $Math_cos(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -0.4161468365471424
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
