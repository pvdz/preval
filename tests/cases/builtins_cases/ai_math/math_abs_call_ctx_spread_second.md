# Preval test case

# math_abs_call_ctx_spread_second.md

> Builtins cases > Ai math > Math abs call ctx spread second
>
> Test Math.abs called with .call and object context, spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.abs.call({}, -14, ...$([3, 6, 9])));
// Expected: 14
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [3, 6, 9];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(14);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([3, 6, 9]);
[...tmpMCSP];
[...tmpMCSP];
$(14);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 3, 6, 9 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 14 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_abs;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [3, 6, 9];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -14, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [3, 6, 9]
 - 2: 14
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
