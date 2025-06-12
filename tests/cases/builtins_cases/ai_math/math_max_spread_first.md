# Preval test case

# math_max_spread_first.md

> Builtins cases > Ai math > Math max spread first
>
> Test: Math.max(...[7, 3]) (spread as first argument)

## Input

`````js filename=intro
// Input: Math.max(...[7, 3])
// Expected: 7 (returns the largest argument)
$(Math.max(...[7, 3]))
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
const tmpMCSP = [7, 3];
let tmpCalleeParam = $dotCall(tmpMCF, Math, `max`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_max


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
