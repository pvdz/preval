# Preval test case

# math_min_direct_4args.md

> Builtins cases > Ai math > Math min direct 4args
>
> Test: Math.min() with 4 arguments

## Input

`````js filename=intro
// Input: Math.min(7, 3, 9, 2)
// Expected: 2 (returns the smallest argument)
$(Math.min(7, 3, 9, 2))
// => 2
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_min;
let tmpCalleeParam = 2;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
