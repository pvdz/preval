# Preval test case

# math_ceil_call_ctx_spread_second.md

> Builtins cases > Ai math > Math ceil call ctx spread second
>
> Test Math.ceil called with .call and object context, spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.ceil.call({}, -2.1, ...$([3.2, 4.3, 5.4])));
// Expected: -2
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [3.2, 4.3, 5.4];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(-2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([3.2, 4.3, 5.4]);
[...tmpMCSP];
[...tmpMCSP];
$(-2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 3.2, 4.3, 5.4 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( -2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_ceil;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [3.2, 4.3, 5.4];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -2.1, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_ceil


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [3.2, 4.3, 5.4]
 - 2: -2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
