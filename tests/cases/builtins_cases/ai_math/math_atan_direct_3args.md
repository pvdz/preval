# Preval test case

# math_atan_direct_3args.md

> Builtins cases > Ai math > Math atan direct 3args
>
> Test Math.atan called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.atan(2, 0, -1));
// Expected: 1.1071487177940904
`````


## Settled


`````js filename=intro
$(1.1071487177940904);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.1071487177940904);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.1071487177940904 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_atan;
const tmpArgOverflow = 2;
let tmpCalleeParam = $Math_atan(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.1071487177940904
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
