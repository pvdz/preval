# Preval test case

# math_log10_direct_3args.md

> Builtins cases > Ai math > Math log10 direct 3args
>
> Test: Math.log10() with 3 arguments

## Input

`````js filename=intro
// Input: Math.log10(10000, 2, 3)
// Expected: 4 (only the first argument is used)
$(Math.log10(10000, 2, 3))
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
const tmpMCF = $Math_log10;
const tmpArgOverflow = 10000;
let tmpCalleeParam = $Math_log10(tmpArgOverflow);
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
