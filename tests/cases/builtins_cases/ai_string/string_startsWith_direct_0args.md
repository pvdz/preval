# Preval test case

# string_startsWith_direct_0args.md

> Builtins cases > Ai string > String startsWith direct 0args
>
> Test String.prototype.startsWith called directly with zero arguments

## Input

`````js filename=intro
$("abc".startsWith());
// Expected: false
`````


## Settled


`````js filename=intro
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_startsWith;
let tmpCalleeParam = false;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
