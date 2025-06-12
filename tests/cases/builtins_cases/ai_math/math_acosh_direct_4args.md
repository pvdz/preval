# Preval test case

# math_acosh_direct_4args.md

> Builtins cases > Ai math > Math acosh direct 4args
>
> Test Math.acosh called directly with four arguments (only first is used)

## Input

`````js filename=intro
$(Math.acosh(10, 2, 3, 4));
// Expected: 2.993222846126381
`````


## Settled


`````js filename=intro
$(2.993222846126381);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2.993222846126381);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2.993222846126381 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_acosh;
const tmpArgOverflow = 10;
let tmpCalleeParam = $Math_acosh(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.993222846126381
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
