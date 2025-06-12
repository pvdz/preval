# Preval test case

# math_log10_spread_first.md

> Builtins cases > Ai math > Math log10 spread first
>
> Test: Math.log10(...[1000, 2]) (spread as first argument)

## Input

`````js filename=intro
// Input: Math.log10(...[1000, 2])
// Expected: 3 (only the first argument is used)
$(Math.log10(...[1000, 2]))
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
const tmpMCF = $Math_log10;
const tmpMCSP = [1000, 2];
let tmpCalleeParam = $dotCall(tmpMCF, Math, `log10`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log10


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
