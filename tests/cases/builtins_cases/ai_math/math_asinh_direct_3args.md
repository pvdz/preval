# Preval test case

# math_asinh_direct_3args.md

> Builtins cases > Ai math > Math asinh direct 3args
>
> Test Math.asinh called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.asinh(2, 0, -1));
// Expected: 1.4436354751788103
`````


## Settled


`````js filename=intro
$(1.4436354751788103);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.4436354751788103);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.4436354751788103 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_asinh;
const tmpArgOverflow = 2;
let tmpCalleeParam = $Math_asinh(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.4436354751788103
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
