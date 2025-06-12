# Preval test case

# math_max_direct_2args.md

> Builtins cases > Ai math > Math max direct 2args
>
> Test: Math.max() with 2 arguments

## Input

`````js filename=intro
// Input: Math.max(7, 3)
// Expected: 7 (returns the largest argument)
$(Math.max(7, 3))
// => 7
`````


## Settled


`````js filename=intro
$(7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(7);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 7 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_max;
let tmpCalleeParam = 7;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 7
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
