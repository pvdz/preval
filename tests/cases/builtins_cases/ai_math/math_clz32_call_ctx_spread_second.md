# Preval test case

# math_clz32_call_ctx_spread_second.md

> Builtins cases > Ai math > Math clz32 call ctx spread second
>
> Test Math.clz32 called with .call and object context, spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.clz32.call({}, 0x800, ...$([0x1000, 0x2000, 0x4000])));
// Expected: 21
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [4096, 8192, 16384];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(20);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([4096, 8192, 16384]);
[...tmpMCSP];
[...tmpMCSP];
$(20);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 4096, 8192, 16384 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 20 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_clz32;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [4096, 8192, 16384];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 2048, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_clz32


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [4096, 8192, 16384]
 - 2: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
