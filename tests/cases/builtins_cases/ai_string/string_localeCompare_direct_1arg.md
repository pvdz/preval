# Preval test case

# string_localeCompare_direct_1arg.md

> Builtins cases > Ai string > String localeCompare direct 1arg
>
> Test 'localeCompare' called directly with one argument on a string instance

## Input

`````js filename=intro
$("abc".localeCompare("abc"));
// Expected: 0
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_localeCompare;
let tmpCalleeParam = 0;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
