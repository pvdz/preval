# Preval test case

# math_abs_call_ctx_spread_second_4args.md

> Builtins cases > Ai math > Math abs call ctx spread second 4args
>
> Test Math.abs called with .call and object context, spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.abs.call({}, -25, ...$([7, 11, 13, 17])));
// Expected: 25
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [7, 11, 13, 17];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(25);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([7, 11, 13, 17]);
[...tmpMCSP];
[...tmpMCSP];
$(25);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 7, 11, 13, 17 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 25 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_abs;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [7, 11, 13, 17];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, -25, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [7, 11, 13, 17]
 - 2: 25
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
