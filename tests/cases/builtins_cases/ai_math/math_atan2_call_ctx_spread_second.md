# Preval test case

# math_atan2_call_ctx_spread_second.md

> Builtins cases > Ai math > Math atan2 call ctx spread second
>
> Test Math.atan2 called with .call and object context, spread as second argument (three values, only first two are used)

## Input

`````js filename=intro
$(Math.atan2.call({}, 6, ...$([7, 8, 9])));
// Expected: 0.7086262721276703
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [7, 8, 9];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_atan2(6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([7, 8, 9]);
[...tmpMCSP];
$($Math_atan2(6, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 7, 8, 9 ];
const b = $( a );
[ ...b ];
const c = $Math_atan2( 6, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_atan2;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [7, 8, 9];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_atan2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [7, 8, 9]
 - 2: 0.7086262721276703
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
