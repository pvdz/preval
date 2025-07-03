# Preval test case

# math_abs_call_ctx_spread_first_4args.md

> Builtins cases > Ai math > Math abs call ctx spread first 4args
>
> Test Math.abs called with .call and object context, spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.abs.call({}, ...$([-20, 5, 8, 2])));
// Expected: 20
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [-20, 5, 8, 2];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_abs(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([-20, 5, 8, 2]);
[...tmpMCSP];
$($Math_abs(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -20, 5, 8, 2 ];
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
let tmpCalleeParam$1 = [-20, 5, 8, 2];
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
 - 1: [-20, 5, 8, 2]
 - 2: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
