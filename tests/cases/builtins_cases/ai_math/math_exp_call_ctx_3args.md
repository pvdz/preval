# Preval test case

# math_exp_call_ctx_3args.md

> Builtins cases > Ai math > Math exp call ctx 3args
>
> Test Math.exp called with .call and object context, three arguments (only first is used)

## Input

`````js filename=intro
$(Math.exp.call({}, 1, 0, 1));
// Expected: 2.718281828459045
`````


## Settled


`````js filename=intro
$(2.718281828459045);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2.718281828459045);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2.718281828459045 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_exp;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 1, 0, 1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_exp


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.718281828459045
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
