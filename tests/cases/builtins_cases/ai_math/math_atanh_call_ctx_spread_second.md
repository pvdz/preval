# Preval test case

# math_atanh_call_ctx_spread_second.md

> Builtins cases > Ai math > Math atanh call ctx spread second
>
> Test Math.atanh called with .call and object context, spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.atanh.call({}, -0.6, ...$([0.2, 0.4, 0.8])));
// Expected: -0.6931471805599453
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [0.2, 0.4, 0.8];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(-0.6931471805599453);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([0.2, 0.4, 0.8]);
[...tmpMCSP];
[...tmpMCSP];
$(-0.6931471805599453);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0.2, 0.4, 0.8 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( -0.6931471805599453 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atanh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [0.2, 0.4, 0.8];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -0.6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_atanh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [0.2, 0.4, 0.8]
 - 2: -0.6931471805599453
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
