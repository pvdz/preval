# Preval test case

# math_log2_direct_3args.md

> Builtins cases > Ai math > Math log2 direct 3args
>
> Test: Math.log2() with 3 arguments

## Input

`````js filename=intro
// Input: Math.log2(32, 2, 3)
// Expected: 5 (only the first argument is used)
$(Math.log2(32, 2, 3))
// => 5
`````


## Settled


`````js filename=intro
$(5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(5);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log2;
const tmpArgOverflow = 32;
let tmpCalleeParam = $Math_log2(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
