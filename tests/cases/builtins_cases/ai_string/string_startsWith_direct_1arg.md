# Preval test case

# string_startsWith_direct_1arg.md

> Builtins cases > Ai string > String startsWith direct 1arg
>
> Test String.prototype.startsWith called directly with one argument

## Input

`````js filename=intro
$("abc".startsWith("a"));
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
