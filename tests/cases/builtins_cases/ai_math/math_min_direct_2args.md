# Preval test case

# math_min_direct_2args.md

> Builtins cases > Ai math > Math min direct 2args
>
> Test: Math.min() with 2 arguments

## Input

`````js filename=intro
// Input: Math.min(7, 3)
// Expected: 3 (returns the smallest argument)
$(Math.min(7, 3))
// => 3
`````


## Settled


`````js filename=intro
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_min;
let tmpCalleeParam = 3;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
