# Preval test case

# math_acosh_call_ctx_2args.md

> Builtins cases > Ai math > Math acosh call ctx 2args
>
> Test Math.acosh called with .call and object context, two arguments (only first is used)

## Input

`````js filename=intro
$(Math.acosh.call({}, 4, 2));
// Expected: 2.0634370688955608
`````


## Settled


`````js filename=intro
$(2.0634370688955608);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2.0634370688955608);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2.0634370688955608 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_acosh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 4, 2);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_acosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.0634370688955608
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
