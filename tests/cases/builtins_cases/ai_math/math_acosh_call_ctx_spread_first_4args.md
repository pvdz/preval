# Preval test case

# math_acosh_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math acosh call ctx spread first 4args
>
> Test Math.acosh called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.acosh.call({}, 8, 9, 10, 11));
// Expected: 2.772588722239781
`````


## Settled


`````js filename=intro
$(2.7686593833135738);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2.7686593833135738);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2.7686593833135738 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_acosh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 8, 9, 10, 11);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_acosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.7686593833135738
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
