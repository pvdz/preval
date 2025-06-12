# Preval test case

# math_atan2_call_ctx_spread_second_4args.md

> Builtins cases > Ai math > Math atan2 call ctx spread second 4args
>
> Test Math.atan2 called with .call and object context, spread as second argument (four values, only first two are used)

## Input

`````js filename=intro
$(Math.atan2.call({}, 10, ...$([11, 12, 13, 14])));
// Expected: 0.7378150601204649
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [11, 12, 13, 14];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_atan2(10, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([11, 12, 13, 14]);
[...tmpMCSP];
$($Math_atan2(10, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 11, 12, 13, 14 ];
const b = $( a );
[ ...b ];
const c = $Math_atan2( 10, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atan2;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [11, 12, 13, 14];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 10, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_atan2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [11, 12, 13, 14]
 - 2: 0.7378150601204649
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
