# Preval test case

# math_clz32_direct_1arg.md

> Builtins cases > Ai math > Math clz32 direct 1arg
>
> Test Math.clz32 called directly with one argument (1)

## Input

`````js filename=intro
$(Math.clz32(1));
// Expected: 31
`````


## Settled


`````js filename=intro
$(31);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(31);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 31 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_clz32;
let tmpCalleeParam = 31;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 31
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
