# Preval test case

# math_fround_spread_first.md

> Builtins cases > Ai math > Math fround spread first
>
> Test Math.fround called directly with spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.fround(...$([2.5, 3.5, 4.5])));
// Expected: 2.5
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [2.5, 3.5, 4.5];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_fround(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([2.5, 3.5, 4.5]);
[...tmpMCSP];
$($Math_fround(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2.5, 3.5, 4.5 ];
const b = $( a );
[ ...b ];
const c = $Math_fround( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_fround;
let tmpCalleeParam$1 = [2.5, 3.5, 4.5];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `fround`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_fround


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2.5, 3.5, 4.5]
 - 2: 2.5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
