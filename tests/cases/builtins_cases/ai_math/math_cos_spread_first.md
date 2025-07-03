# Preval test case

# math_cos_spread_first.md

> Builtins cases > Ai math > Math cos spread first
>
> Test Math.cos called directly with spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.cos(...$([2, 3, 4])));
// Expected: -0.4161468365471424
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [2, 3, 4];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_cos(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([2, 3, 4]);
[...tmpMCSP];
$($Math_cos(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2, 3, 4 ];
const b = $( a );
[ ...b ];
const c = $Math_cos( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cos;
let tmpCalleeParam$1 = [2, 3, 4];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `cos`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_cos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 3, 4]
 - 2: -0.4161468365471424
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
