# Preval test case

# math_cbrt_call_ctx_spread_second_4args.md

> Builtins cases > Ai math > Math cbrt call ctx spread second 4args
>
> Test Math.cbrt called with .call and object context, spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.cbrt.call({}, 729, ...$([1000, 1331, 1728, 2197])));
// Expected: 9
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1000, 1331, 1728, 2197];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([1000, 1331, 1728, 2197]);
[...tmpMCSP];
[...tmpMCSP];
$(9);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1000, 1331, 1728, 2197 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 9 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_cbrt;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [1000, 1331, 1728, 2197];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 729, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_cbrt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1000, 1331, 1728, 2197]
 - 2: 9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
