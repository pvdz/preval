# Preval test case

# math_asin_call_ctx_spread_second_4args.md

> Builtins cases > Ai math > Math asin call ctx spread second 4args
>
> Test Math.asin called with .call and object context, spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.asin.call({}, 0.2, ...$([0.4, 0.6, 0.8, 1.0])));
// Expected: 0.2013579207903308
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [0.4, 0.6, 0.8, 1];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(0.2013579207903308);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([0.4, 0.6, 0.8, 1]);
[...tmpMCSP];
[...tmpMCSP];
$(0.2013579207903308);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0.4, 0.6, 0.8, 1 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 0.2013579207903308 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_asin;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [0.4, 0.6, 0.8, 1];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 0.2, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_asin


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [0.4, 0.6, 0.8, 1]
 - 2: 0.2013579207903308
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
