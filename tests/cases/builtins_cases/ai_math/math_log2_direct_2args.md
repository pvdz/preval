# Preval test case

# math_log2_direct_2args.md

> Builtins cases > Ai math > Math log2 direct 2args
>
> Test: Math.log2() with 2 arguments

## Input

`````js filename=intro
// Input: Math.log2(16, 2)
// Expected: 4 (only the first argument is used)
$(Math.log2(16, 2))
// => 4
`````


## Settled


`````js filename=intro
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log2;
const tmpArgOverflow = 16;
let tmpCalleeParam = $Math_log2(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
