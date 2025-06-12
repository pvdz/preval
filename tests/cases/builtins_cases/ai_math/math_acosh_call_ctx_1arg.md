# Preval test case

# math_acosh_call_ctx_1arg.md

> Builtins cases > Ai math > Math acosh call ctx 1arg
>
> Test Math.acosh called with .call and object context, one argument (3)

## Input

`````js filename=intro
$(Math.acosh.call({}, 3));
// Expected: 1.762747174039086
`````


## Settled


`````js filename=intro
$(1.7627471740390859);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.7627471740390859);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.7627471740390859 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_acosh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 3);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_acosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.7627471740390859
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
