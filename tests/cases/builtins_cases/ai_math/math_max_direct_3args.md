# Preval test case

# math_max_direct_3args.md

> Builtins cases > Ai math > Math max direct 3args
>
> Test: Math.max() with 3 arguments

## Input

`````js filename=intro
// Input: Math.max(7, 3, 9)
// Expected: 9 (returns the largest argument)
$(Math.max(7, 3, 9))
// => 9
`````


## Settled


`````js filename=intro
$(9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(9);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 9 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_max;
let tmpCalleeParam = 9;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
