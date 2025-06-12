# Preval test case

# math_cosh_direct_3args.md

> Builtins cases > Ai math > Math cosh direct 3args
>
> Test Math.cosh called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.cosh(2, 0, -1));
// Expected: 3.7621956910836314
`````


## Settled


`````js filename=intro
$(3.7621956910836314);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3.7621956910836314);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3.7621956910836314 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cosh;
const tmpArgOverflow = 2;
let tmpCalleeParam = $Math_cosh(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3.7621956910836314
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
