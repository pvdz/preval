# Preval test case

# math_atan_call_ctx_1arg.md

> Builtins cases > Ai math > Math atan call ctx 1arg
>
> Test Math.atan called with .call and object context, one argument (3)

## Input

`````js filename=intro
$(Math.atan.call({}, 3));
// Expected: 1.2490457723982544
`````


## Settled


`````js filename=intro
$(1.2490457723982544);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.2490457723982544);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.2490457723982544 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atan;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 3);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atan


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.2490457723982544
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
