# Preval test case

# math_log2_spread_first.md

> Builtins cases > Ai math > Math log2 spread first
>
> Test: Math.log2(...[16, 2]) (spread as first argument)

## Input

`````js filename=intro
// Input: Math.log2(...[16, 2])
// Expected: 4 (only the first argument is used)
$(Math.log2(...[16, 2]))
// => 4
`````


## Settled


`````js filename=intro
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log2;
const tmpMCSP = [16, 2];
let tmpCalleeParam = $dotCall(tmpMCF, Math, `log2`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
