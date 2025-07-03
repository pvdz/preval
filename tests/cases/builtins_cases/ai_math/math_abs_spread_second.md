# Preval test case

# math_abs_spread_second.md

> Builtins cases > Ai math > Math abs spread second
>
> Test Math.abs called directly with spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.abs(-2, ...$([4, 8, 1])));
// Expected: 2
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [4, 8, 1];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([4, 8, 1]);
[...tmpMCSP];
[...tmpMCSP];
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 4, 8, 1 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_abs;
let tmpCalleeParam$1 = [4, 8, 1];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `abs`, -2, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [4, 8, 1]
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
