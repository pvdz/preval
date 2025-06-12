# Preval test case

# math_fround_direct_2args.md

> Builtins cases > Ai math > Math fround direct 2args
>
> Test Math.fround called directly with two arguments (only first is used)

## Input

`````js filename=intro
$(Math.fround(-2.5, 2));
// Expected: -2.5
`````


## Settled


`````js filename=intro
$(-2.5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-2.5);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -2.5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_fround;
const tmpArgOverflow = -2.5;
let tmpCalleeParam = $Math_fround(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -2.5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
