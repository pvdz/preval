# Preval test case

# math_ceil_call_ctx_spread_second_4args.md

> Builtins cases > Ai math > Math ceil call ctx spread second 4args
>
> Test Math.ceil called with .call and object context, spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.ceil.call({}, 5.6, ...$([6.7, 7.8, 8.9, 9.1])));
// Expected: 6
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [6.7, 7.8, 8.9, 9.1];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(6);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([6.7, 7.8, 8.9, 9.1]);
[...tmpMCSP];
[...tmpMCSP];
$(6);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 6.7, 7.8, 8.9, 9.1 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 6 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_ceil;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [6.7, 7.8, 8.9, 9.1];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 5.6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_ceil


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [6.7, 7.8, 8.9, 9.1]
 - 2: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
