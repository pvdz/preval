# Preval test case

# math_clz32_call_ctx_spread_second_4args.md

> Builtins cases > Ai math > Math clz32 call ctx spread second 4args
>
> Test Math.clz32 called with .call and object context, spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.clz32.call({}, 0x1000, ...$([0x2000, 0x4000, 0x8000, 0x10000])));
// Expected: 20
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [8192, 16384, 32768, 65536];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(19);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([8192, 16384, 32768, 65536]);
[...tmpMCSP];
[...tmpMCSP];
$(19);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 8192, 16384, 32768, 65536 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 19 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_clz32;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [8192, 16384, 32768, 65536];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 4096, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_clz32


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [8192, 16384, 32768, 65536]
 - 2: 19
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
