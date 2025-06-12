# Preval test case

# math_min_direct_1arg.md

> Builtins cases > Ai math > Math min direct 1arg
>
> Test: Math.min() with 1 argument

## Input

`````js filename=intro
// Input: Math.min(7)
// Expected: 7 (single argument returns itself)
$(Math.min(7))
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
const tmpMCF = $Math_min;
let tmpCalleeParam = 7;
$(tmpCalleeParam);
`````


## Todos triggered


None


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
