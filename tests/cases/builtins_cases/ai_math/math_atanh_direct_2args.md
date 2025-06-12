# Preval test case

# math_atanh_direct_2args.md

> Builtins cases > Ai math > Math atanh direct 2args
>
> Test Math.atanh called directly with two arguments (only first is used)

## Input

`````js filename=intro
$(Math.atanh(-0.5, 2));
// Expected: -0.5493061443340548
`````


## Settled


`````js filename=intro
$(-0.5493061443340548);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-0.5493061443340548);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -0.5493061443340548 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_atanh;
const tmpArgOverflow = -0.5;
let tmpCalleeParam = $Math_atanh(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -0.5493061443340548
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
