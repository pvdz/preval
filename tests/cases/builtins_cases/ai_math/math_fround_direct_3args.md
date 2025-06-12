# Preval test case

# math_fround_direct_3args.md

> Builtins cases > Ai math > Math fround direct 3args
>
> Test Math.fround called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.fround(3.14159, 0, -1));
// Expected: 3.141590118408203
`````


## Settled


`````js filename=intro
$(3.141590118408203);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3.141590118408203);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3.141590118408203 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_fround;
const tmpArgOverflow = 3.14159;
let tmpCalleeParam = $Math_fround(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3.141590118408203
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
