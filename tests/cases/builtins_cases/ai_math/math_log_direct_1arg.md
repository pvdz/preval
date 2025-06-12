# Preval test case

# math_log_direct_1arg.md

> Builtins cases > Ai math > Math log direct 1arg
>
> Test: Math.log() with 1 argument

## Input

`````js filename=intro
// Input: Math.log(1)
// Expected: 0 (log(1) is 0)
$(Math.log(1))
// => 0
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log;
let tmpCalleeParam = 0;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
