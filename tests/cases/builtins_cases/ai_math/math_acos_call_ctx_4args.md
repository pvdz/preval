# Preval test case

# math_acos_call_ctx_4args.md

> Builtins cases > Ai math > Math acos call ctx 4args
>
> Test Math.acos called with .call and object context, four arguments (only first is used)

## Input

`````js filename=intro
$(Math.acos.call({}, 0.1, 2, 3, 4));
// Expected: 1.4706289056333368
`````


## Settled


`````js filename=intro
$(1.4706289056333368);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.4706289056333368);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.4706289056333368 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_acos;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.1, 2, 3, 4);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_acos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.4706289056333368
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
