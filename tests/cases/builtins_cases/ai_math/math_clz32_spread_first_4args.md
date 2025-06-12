# Preval test case

# math_clz32_spread_first_4args.md

> Builtins cases > Ai math > Math clz32 spread first 4args
>
> Test Math.clz32 called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.clz32(...$([0x100, 0x1000, 0x10000, 0x100000])));
// Expected: 24
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [256, 4096, 65536, 1048576];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_clz32(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([256, 4096, 65536, 1048576]);
[...tmpMCSP];
$($Math_clz32(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 256, 4096, 65536, 1048576 ];
const b = $( a );
[ ...b ];
const c = $Math_clz32( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_clz32;
let tmpCalleeParam$1 = [256, 4096, 65536, 1048576];
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
 - 1: [256, 4096, 65536, 1048576]
 - 2: 23
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
