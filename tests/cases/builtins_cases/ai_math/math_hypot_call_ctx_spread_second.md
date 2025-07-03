# Preval test case

# math_hypot_call_ctx_spread_second.md

> Builtins cases > Ai math > Math hypot call ctx spread second
>
> Test Math.hypot called with .call and object context, spread as second argument (three values)

## Input

`````js filename=intro
$(Math.hypot.call({}, 7, ...$([24, 25, 120])));
// Expected: 121
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [24, 25, 120];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_hypot(7, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([24, 25, 120]);
[...tmpMCSP];
$($Math_hypot(7, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 24, 25, 120 ];
const b = $( a );
[ ...b ];
const c = $Math_hypot( 7, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_hypot;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [24, 25, 120];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 7, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_hypot


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [24, 25, 120]
 - 2: 125.09996003196805
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
