# Preval test case

# math_hypot_call_ctx_spread_second_4args.md

> Builtins cases > Ai math > Math hypot call ctx spread second 4args
>
> Test Math.hypot called with .call and object context, spread as second argument (four values)

## Input

`````js filename=intro
$(Math.hypot.call({}, 3, ...$([4, 5, 6, 7])));
// Expected: 10.488088481701515
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [4, 5, 6, 7];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_hypot(3, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([4, 5, 6, 7]);
[...tmpMCSP];
$($Math_hypot(3, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 4, 5, 6, 7 ];
const b = $( a );
[ ...b ];
const c = $Math_hypot( 3, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_hypot;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [4, 5, 6, 7];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 3, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_hypot


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [4, 5, 6, 7]
 - 2: 11.61895003862225
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
