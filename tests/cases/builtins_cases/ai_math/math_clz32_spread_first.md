# Preval test case

# math_clz32_spread_first.md

> Builtins cases > Ai math > Math clz32 spread first
>
> Test Math.clz32 called directly with spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.clz32(...$([0x10, 0x100, 0x1000])));
// Expected: 27
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [16, 256, 4096];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_clz32(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([16, 256, 4096]);
[...tmpMCSP];
$($Math_clz32(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 16, 256, 4096 ];
const b = $( a );
[ ...b ];
const c = $Math_clz32( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_clz32;
let tmpCalleeParam$1 = [16, 256, 4096];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `clz32`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_clz32


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [16, 256, 4096]
 - 2: 27
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
