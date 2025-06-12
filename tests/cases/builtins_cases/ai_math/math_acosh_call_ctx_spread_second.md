# Preval test case

# math_acosh_call_ctx_spread_second.md

> Builtins cases > Ai math > Math acosh call ctx spread second
>
> Test Math.acosh called with .call and object context, spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.acosh.call({}, 5, ...$([6, 7, 8])));
// Expected: 2.2924316695611777
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [6, 7, 8];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(2.2924316695611777);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([6, 7, 8]);
[...tmpMCSP];
[...tmpMCSP];
$(2.2924316695611777);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 6, 7, 8 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 2.2924316695611777 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_acosh;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [6, 7, 8];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 5, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_acosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [6, 7, 8]
 - 2: 2.2924316695611777
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
