# Preval test case

# string_charCodeAt_direct_0args.md

> Builtins cases > Ai string > String charCodeAt direct 0args
>
> Test String.prototype.charCodeAt called directly with zero arguments

## Input

`````js filename=intro
$("abc".charCodeAt());
// Expected: 97
`````


## Settled


`````js filename=intro
$(97);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(97);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 97 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_charCodeAt;
let tmpCalleeParam = 97;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 97
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
