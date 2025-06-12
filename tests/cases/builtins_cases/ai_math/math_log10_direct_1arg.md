# Preval test case

# math_log10_direct_1arg.md

> Builtins cases > Ai math > Math log10 direct 1arg
>
> Test: Math.log10() with 1 argument

## Input

`````js filename=intro
// Input: Math.log10(100)
// Expected: 2 (log10(100) is 2)
$(Math.log10(100))
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
const tmpMCF = $Math_log10;
let tmpCalleeParam = 2;
$(tmpCalleeParam);
`````


## Todos triggered


None


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
