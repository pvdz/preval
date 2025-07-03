# Preval test case

# math_ceil_spread_first.md

> Builtins cases > Ai math > Math ceil spread first
>
> Test Math.ceil called directly with spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.ceil(...$([1.1, 2.2, 3.3])));
// Expected: 2
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1.1, 2.2, 3.3];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_ceil(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([1.1, 2.2, 3.3]);
[...tmpMCSP];
$($Math_ceil(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1.1, 2.2, 3.3 ];
const b = $( a );
[ ...b ];
const c = $Math_ceil( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_ceil;
let tmpCalleeParam$1 = [1.1, 2.2, 3.3];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `ceil`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_ceil


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1.1, 2.2, 3.3]
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
