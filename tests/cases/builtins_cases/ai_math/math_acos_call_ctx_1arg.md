# Preval test case

# math_acos_call_ctx_1arg.md

> Builtins cases > Ai math > Math acos call ctx 1arg
>
> Test Math.acos called with .call and object context, one argument (0.25)

## Input

`````js filename=intro
$(Math.acos.call({}, 0.25));
// Expected: 1.318116071652818
`````


## Settled


`````js filename=intro
$(1.318116071652818);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.318116071652818);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.318116071652818 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_acos;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.25);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_acos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.318116071652818
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
