# Preval test case

# math_clz32_direct_4args.md

> Builtins cases > Ai math > Math clz32 direct 4args
>
> Test Math.clz32 called directly with four arguments (only first is used)

## Input

`````js filename=intro
$(Math.clz32(0, 1, 2, 3));
// Expected: 32
`````


## Settled


`````js filename=intro
$(32);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(32);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 32 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_clz32;
const tmpArgOverflow = 0;
let tmpCalleeParam = $Math_clz32(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 32
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
