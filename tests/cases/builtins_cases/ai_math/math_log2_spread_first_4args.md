# Preval test case

# math_log2_spread_first_4args.md

> Builtins cases > Ai math > Math log2 spread first 4args
>
> Test: Math.log2(...[64, 2, 3, 4]) (spread as first argument, 4 values)

## Input

`````js filename=intro
// Input: Math.log2(...[64, 2, 3, 4])
// Expected: 6 (only the first argument is used)
$(Math.log2(...[64, 2, 3, 4]))
// => 6
`````


## Settled


`````js filename=intro
$(6);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(6);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 6 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log2;
const tmpMCSP = [64, 2, 3, 4];
let tmpCalleeParam = $dotCall(tmpMCF, Math, `log2`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
