# Preval test case

# math_log10_direct_2args.md

> Builtins cases > Ai math > Math log10 direct 2args
>
> Test: Math.log10() with 2 arguments

## Input

`````js filename=intro
// Input: Math.log10(1000, 2)
// Expected: 3 (only the first argument is used)
$(Math.log10(1000, 2))
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
const tmpMCF = $Math_log10;
const tmpArgOverflow = 1000;
let tmpCalleeParam = $Math_log10(tmpArgOverflow);
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
