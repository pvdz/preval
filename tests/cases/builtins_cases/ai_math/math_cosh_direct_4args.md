# Preval test case

# math_cosh_direct_4args.md

> Builtins cases > Ai math > Math cosh direct 4args
>
> Test Math.cosh called directly with four arguments (only first is used)

## Input

`````js filename=intro
$(Math.cosh(0, 1, 2, 3));
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
const tmpMCF = $Math_cosh;
const tmpArgOverflow = 0;
let tmpCalleeParam = $Math_cosh(tmpArgOverflow);
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
