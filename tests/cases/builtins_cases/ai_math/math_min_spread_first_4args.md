# Preval test case

# math_min_spread_first_4args.md

> Builtins cases > Ai math > Math min spread first 4args
>
> Test: Math.min(...[7, 3, 9, 2]) (spread as first argument, 4 values)

## Input

`````js filename=intro
// Input: Math.min(...[7, 3, 9, 2])
// Expected: 2 (returns the smallest argument)
$(Math.min(...[7, 3, 9, 2]))
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
const tmpMCSP = [7, 3, 9, 2];
let tmpCalleeParam = $dotCall(tmpMCF, Math, `min`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_min


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
