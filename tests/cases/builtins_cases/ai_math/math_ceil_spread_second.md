# Preval test case

# math_ceil_spread_second.md

> Builtins cases > Ai math > Math ceil spread second
>
> Test Math.ceil called directly with spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.ceil(-1.2, ...$([2.2, 3.3, 4.4])));
// Expected: -1
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [2.2, 3.3, 4.4];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([2.2, 3.3, 4.4]);
[...tmpMCSP];
[...tmpMCSP];
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2.2, 3.3, 4.4 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_ceil;
let tmpCalleeParam$1 = [2.2, 3.3, 4.4];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `ceil`, -1.2, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_ceil


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2.2, 3.3, 4.4]
 - 2: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
