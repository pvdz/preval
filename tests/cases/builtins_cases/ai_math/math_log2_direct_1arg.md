# Preval test case

# math_log2_direct_1arg.md

> Builtins cases > Ai math > Math log2 direct 1arg
>
> Test: Math.log2() with 1 argument

## Input

`````js filename=intro
// Input: Math.log2(8)
// Expected: 3 (log2(8) is 3)
$(Math.log2(8))
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
const tmpMCF = $Math_log2;
let tmpCalleeParam = 3;
$(tmpCalleeParam);
`````


## Todos triggered


None


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
