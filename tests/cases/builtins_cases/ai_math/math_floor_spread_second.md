# Preval test case

# math_floor_spread_second.md

> Builtins cases > Ai math > Math floor spread second
>
> Test Math.floor called directly with spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.floor(-1.2, ...$([2.2, 3.3, 4.4])));
// Expected: -2
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [2.2, 3.3, 4.4];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(-2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([2.2, 3.3, 4.4]);
[...tmpMCSP];
[...tmpMCSP];
$(-2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2.2, 3.3, 4.4 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( -2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_floor;
let tmpCalleeParam$1 = [2.2, 3.3, 4.4];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `floor`, -1.2, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_floor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2.2, 3.3, 4.4]
 - 2: -2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
