# Preval test case

# math_floor_call_ctx_spread_second.md

> Builtins cases > Ai math > Math floor call ctx spread second
>
> Test Math.floor called with .call and object context, spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.floor.call({}, -2.1, ...$([3.2, 4.3, 5.4])));
// Expected: -3
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [3.2, 4.3, 5.4];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(-3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([3.2, 4.3, 5.4]);
[...tmpMCSP];
[...tmpMCSP];
$(-3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 3.2, 4.3, 5.4 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( -3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_floor;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [3.2, 4.3, 5.4];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -2.1, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_floor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [3.2, 4.3, 5.4]
 - 2: -3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
