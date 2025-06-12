# Preval test case

# string_localeCompare_direct_0args.md

> Builtins cases > Ai string > String localeCompare direct 0args
>
> Test 'localeCompare' called directly with zero arguments on a string instance

## Input

`````js filename=intro
$("abc".localeCompare());
// Expected: NaN
`````


## Settled


`````js filename=intro
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_localeCompare;
let tmpCalleeParam = -1;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
