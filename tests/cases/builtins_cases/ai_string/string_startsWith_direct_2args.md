# Preval test case

# string_startsWith_direct_2args.md

> Builtins cases > Ai string > String startsWith direct 2args
>
> Test String.prototype.startsWith called directly with two arguments

## Input

`````js filename=intro
$("abc".startsWith("b", 1));
// Expected: true
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_startsWith;
let tmpCalleeParam = true;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
