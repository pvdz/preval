# Preval test case

# string_charCodeAt_direct_1arg.md

> Builtins cases > Ai string > String charCodeAt direct 1arg
>
> Test String.prototype.charCodeAt called directly with one argument

## Input

`````js filename=intro
$("abc".charCodeAt(1));
// Expected: 98
`````


## Settled


`````js filename=intro
$(98);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(98);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 98 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_charCodeAt;
let tmpCalleeParam = 98;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 98
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
