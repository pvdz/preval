# Preval test case

# math_log1p_spread_first.md

> Builtins cases > Ai math > Math log1p spread first
>
> Test: Math.log1p(...[2, 3]) (spread as first argument)

## Input

`````js filename=intro
// Input: Math.log1p(...[2, 3])
// Expected: 1.0986122886681096 (only the first argument is used)
$(Math.log1p(...[2, 3]))
// => 1.0986122886681096
`````


## Settled


`````js filename=intro
$(1.0986122886681096);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.0986122886681096);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.0986122886681096 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log1p;
const tmpMCSP = [2, 3];
let tmpCalleeParam = $dotCall(tmpMCF, Math, `log1p`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log1p


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.0986122886681096
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
