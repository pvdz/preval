# Preval test case

# math_log10_direct_4args.md

> Builtins cases > Ai math > Math log10 direct 4args
>
> Test: Math.log10() with 4 arguments

## Input

`````js filename=intro
// Input: Math.log10(100000, 2, 3, 4)
// Expected: 5 (only the first argument is used)
$(Math.log10(100000, 2, 3, 4))
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
const tmpMCF = $Math_log10;
const tmpArgOverflow = 100000;
let tmpCalleeParam = $Math_log10(tmpArgOverflow);
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
