# Preval test case

# math_trunc_direct_4args.md

> Builtins cases > Ai math > Math trunc direct 4args
>
> Test Math.trunc called directly with four arguments

## Input

`````js filename=intro
$(Math.trunc(1.7, 2.3, 3.9, 4.1));
// Expected: 1
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_trunc;
const tmpArgOverflow = 1.7;
let tmpCalleeParam = $Math_trunc(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
