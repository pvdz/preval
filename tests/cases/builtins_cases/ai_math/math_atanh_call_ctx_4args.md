# Preval test case

# math_atanh_call_ctx_4args.md

> Builtins cases > Ai math > Math atanh call ctx 4args
>
> Test Math.atanh called with .call and object context, four arguments (only first is used)

## Input

`````js filename=intro
$(Math.atanh.call({}, 0.1, 2, 3, 4));
// Expected: 0.10033534773107562
`````


## Settled


`````js filename=intro
$(0.10033534773107558);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.10033534773107558);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.10033534773107558 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atanh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.1, 2, 3, 4);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atanh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.10033534773107558
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
