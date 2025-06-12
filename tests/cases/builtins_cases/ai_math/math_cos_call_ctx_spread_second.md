# Preval test case

# math_cos_call_ctx_spread_second.md

> Builtins cases > Ai math > Math cos call ctx spread second
>
> Test Math.cos called with .call and object context, spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.cos.call({}, 8, ...$([9, 10, 11])));
// Expected: -0.14550003380861354
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [9, 10, 11];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(-0.14550003380861354);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([9, 10, 11]);
[...tmpMCSP];
[...tmpMCSP];
$(-0.14550003380861354);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 9, 10, 11 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( -0.14550003380861354 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_cos;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [9, 10, 11];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 8, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_cos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [9, 10, 11]
 - 2: -0.14550003380861354
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
