# Preval test case

# math_imul_direct_4args.md

> Builtins cases > Ai math > Math imul direct 4args
>
> Test: Math.imul() with 4 arguments

## Input

`````js filename=intro
// Input: Math.imul(2, 4, 5, 6)
// Expected: 8 (only the first two arguments are used)
$(Math.imul(2, 4, 5, 6))
// => 8
`````


## Settled


`````js filename=intro
$(8);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(8);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 8 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_imul;
const tmpArgOverflow = 2;
const tmpArgOverflow$1 = 4;
let tmpCalleeParam = $Math_imul(tmpArgOverflow, tmpArgOverflow$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
