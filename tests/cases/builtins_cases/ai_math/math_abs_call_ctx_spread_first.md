# Preval test case

# math_abs_call_ctx_spread_first.md

> Builtins cases > Ai math > Math abs call ctx spread first
>
> Test Math.abs called with .call and object context, spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.abs.call({}, ...$([-10, 4, 7])));
// Expected: 10
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [-10, 4, 7];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_abs(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([-10, 4, 7]);
[...tmpMCSP];
$($Math_abs(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -10, 4, 7 ];
const b = $( a );
[ ...b ];
const c = $Math_abs( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_abs;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [-10, 4, 7];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [-10, 4, 7]
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
