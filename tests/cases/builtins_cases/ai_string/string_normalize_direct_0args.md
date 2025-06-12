# Preval test case

# string_normalize_direct_0args.md

> Builtins cases > Ai string > String normalize direct 0args
>
> Test 'normalize' called directly with zero arguments on a string instance

## Input

`````js filename=intro
$("Amélie".normalize());
// Expected: "Amélie"
`````


## Settled


`````js filename=intro
$(`Am\u00e9lie`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`Am\u00e9lie`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "Am\u00e9lie" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_normalize;
let tmpCalleeParam = `Am\u00e9lie`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Amélie'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
