# Preval test case

# math_min_spread_first.md

> Builtins cases > Ai math > Math min spread first
>
> Test: Math.min(...[7, 3]) (spread as first argument)

## Input

`````js filename=intro
// Input: Math.min(...[7, 3])
// Expected: 3 (returns the smallest argument)
$(Math.min(...[7, 3]))
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
const tmpMCSP = [7, 3];
let tmpCalleeParam = $dotCall(tmpMCF, Math, `min`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_min


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
