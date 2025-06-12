# Preval test case

# math_clz32_direct_3args.md

> Builtins cases > Ai math > Math clz32 direct 3args
>
> Test Math.clz32 called directly with three arguments (only first is used)

## Input

`````js filename=intro
$(Math.clz32(0x80000000, 0, -1));
// Expected: 0
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_clz32;
const tmpArgOverflow = 2147483648;
let tmpCalleeParam = $Math_clz32(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
