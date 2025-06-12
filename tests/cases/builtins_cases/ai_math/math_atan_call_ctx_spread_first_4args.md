# Preval test case

# math_atan_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math atan call ctx spread first 4args
>
> Test Math.atan called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.atan.call({}, 8, 9, 10, 11));
// Expected: 1.446441332248135
`````


## Settled


`````js filename=intro
$(1.446441332248135);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.446441332248135);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.446441332248135 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atan;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 8, 9, 10, 11);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_atan


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.446441332248135
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
