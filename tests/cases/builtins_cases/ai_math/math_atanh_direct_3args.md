# Preval test case

# math_atanh_direct_3args.md

> Builtins cases > Ai math > Math atanh direct 3args
>
> Test Math.atanh called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.atanh(0.1, 0, -1));
// Expected: 0.10033534773107562
`````


## Settled


`````js filename=intro
$(0.10033534773107558);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.10033534773107558);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.10033534773107558 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_atanh;
const tmpArgOverflow = 0.1;
let tmpCalleeParam = $Math_atanh(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.10033534773107558
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
