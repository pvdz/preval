# Preval test case

# math_asinh_call_ctx_spread_second.md

> Builtins cases > Ai math > Math asinh call ctx spread second
>
> Test Math.asinh called with .call and object context, spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.asinh.call({}, 5, ...$([6, 7, 8])));
// Expected: 2.3124383412727525
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [6, 7, 8];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(2.3124383412727525);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([6, 7, 8]);
[...tmpMCSP];
[...tmpMCSP];
$(2.3124383412727525);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 6, 7, 8 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 2.3124383412727525 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_asinh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [6, 7, 8];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 5, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_asinh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [6, 7, 8]
 - 2: 2.3124383412727525
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
