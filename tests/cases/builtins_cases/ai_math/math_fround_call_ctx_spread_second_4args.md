# Preval test case

# math_fround_call_ctx_spread_second_4args.md

> Builtins cases > Ai math > Math fround call ctx spread second 4args
>
> Test Math.fround called with .call and object context, spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.fround.call({}, 9.99, ...$([10.1, 11.11, 12.12, 13.13])));
// Expected: 9.989999771118164
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [10.1, 11.11, 12.12, 13.13];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(9.989999771118164);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([10.1, 11.11, 12.12, 13.13]);
[...tmpMCSP];
[...tmpMCSP];
$(9.989999771118164);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10.1, 11.11, 12.12, 13.13 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 9.989999771118164 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_fround;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [10.1, 11.11, 12.12, 13.13];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 9.99, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_fround


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [10.1, 11.11, 12.12, 13.13]
 - 2: 9.989999771118164
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
