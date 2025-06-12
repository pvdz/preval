# Preval test case

# math_imul_direct_2args.md

> Builtins cases > Ai math > Math imul direct 2args
>
> Test: Math.imul() with 2 arguments

## Input

`````js filename=intro
// Input: Math.imul(6, 3)
// Expected: 18 (6 * 3)
$(Math.imul(6, 3))
// => 18
`````


## Settled


`````js filename=intro
$(18);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(18);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 18 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_imul;
let tmpCalleeParam = 18;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 18
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
