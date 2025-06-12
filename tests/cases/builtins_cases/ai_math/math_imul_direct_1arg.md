# Preval test case

# math_imul_direct_1arg.md

> Builtins cases > Ai math > Math imul direct 1arg
>
> Test: Math.imul() with 1 argument

## Input

`````js filename=intro
// Input: Math.imul(7)
// Expected: 0 (missing second argument is treated as 0)
$(Math.imul(7))
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
const tmpMCF = $Math_imul;
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
