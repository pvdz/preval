# Preval test case

# math_cos_call_ctx_spread_second_4args.md

> Builtins cases > Ai math > Math cos call ctx spread second 4args
>
> Test Math.cos called with .call and object context, spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.cos.call({}, 9, ...$([10, 11, 12, 13])));
// Expected: -0.9111302618846769
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [10, 11, 12, 13];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(-0.9111302618846769);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([10, 11, 12, 13]);
[...tmpMCSP];
[...tmpMCSP];
$(-0.9111302618846769);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 11, 12, 13 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( -0.9111302618846769 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_cos;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [10, 11, 12, 13];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 9, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_cos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [10, 11, 12, 13]
 - 2: -0.9111302618846769
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
