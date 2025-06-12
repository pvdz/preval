# Preval test case

# math_acosh_call_ctx_3args.md

> Builtins cases > Ai math > Math acosh call ctx 3args
>
> Test Math.acosh called with .call and object context, three arguments (only first is used)

## Input

`````js filename=intro
$(Math.acosh.call({}, 7, 1, 0));
// Expected: 2.6339157938496336
`````


## Settled


`````js filename=intro
$(2.6339157938496336);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2.6339157938496336);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2.6339157938496336 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_acosh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 7, 1, 0);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_acosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.6339157938496336
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
