# Preval test case

# math_clz32_spread_second_4args.md

> Builtins cases > Ai math > Math clz32 spread second 4args
>
> Test Math.clz32 called directly with spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.clz32(0x10000, ...$([0x100000, 0x1000000, 0x10000000, 0x80000000])));
// Expected: 15
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1048576, 16777216, 268435456, 2147483648];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(15);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([1048576, 16777216, 268435456, 2147483648]);
[...tmpMCSP];
[...tmpMCSP];
$(15);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1048576, 16777216, 268435456, 2147483648 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 15 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_clz32;
let tmpCalleeParam$1 = [1048576, 16777216, 268435456, 2147483648];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `clz32`, 65536, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_clz32


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1048576, 16777216, 268435456, 2147483648]
 - 2: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
