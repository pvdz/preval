# Preval test case

# math_trunc_spread_first.md

> Builtins cases > Ai math > Math trunc spread first
>
> Test Math.trunc called directly with spread as first argument (three values)

## Input

`````js filename=intro
$(Math.trunc(...$([1.7, 2.3, 3.9])));
// Expected: 1
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1.7, 2.3, 3.9];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_trunc(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([1.7, 2.3, 3.9]);
[...tmpMCSP];
$($Math_trunc(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1.7, 2.3, 3.9 ];
const b = $( a );
[ ...b ];
const c = $Math_trunc( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_trunc;
let tmpCalleeParam$1 = [1.7, 2.3, 3.9];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `trunc`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_trunc


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1.7, 2.3, 3.9]
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
