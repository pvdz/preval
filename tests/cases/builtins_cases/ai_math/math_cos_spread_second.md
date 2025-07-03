# Preval test case

# math_cos_spread_second.md

> Builtins cases > Ai math > Math cos spread second
>
> Test Math.cos called directly with spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.cos(4, ...$([5, 6, 7])));
// Expected: -0.6536436208636119
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [5, 6, 7];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(-0.6536436208636119);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([5, 6, 7]);
[...tmpMCSP];
[...tmpMCSP];
$(-0.6536436208636119);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 5, 6, 7 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( -0.6536436208636119 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cos;
let tmpCalleeParam$1 = [5, 6, 7];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `cos`, 4, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_cos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [5, 6, 7]
 - 2: -0.6536436208636119
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
