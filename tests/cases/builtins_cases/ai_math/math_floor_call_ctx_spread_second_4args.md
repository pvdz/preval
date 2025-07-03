# Preval test case

# math_floor_call_ctx_spread_second_4args.md

> Builtins cases > Ai math > Math floor call ctx spread second 4args
>
> Test Math.floor called with .call and object context, spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.floor.call({}, 5.6, ...$([6.7, 7.8, 8.9, 9.1])));
// Expected: 5
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [6.7, 7.8, 8.9, 9.1];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([6.7, 7.8, 8.9, 9.1]);
[...tmpMCSP];
[...tmpMCSP];
$(5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 6.7, 7.8, 8.9, 9.1 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_floor;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [6.7, 7.8, 8.9, 9.1];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 5.6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_floor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [6.7, 7.8, 8.9, 9.1]
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
