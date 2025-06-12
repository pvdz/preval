# Preval test case

# math_abs_spread_first.md

> Builtins cases > Ai math > Math abs spread first
>
> Test Math.abs called directly with spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.abs(...$([-6, 2, 5])));
// Expected: 6
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [-6, 2, 5];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_abs(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([-6, 2, 5]);
[...tmpMCSP];
$($Math_abs(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -6, 2, 5 ];
const b = $( a );
[ ...b ];
const c = $Math_abs( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_abs;
let tmpCalleeParam$1 = [-6, 2, 5];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `abs`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [-6, 2, 5]
 - 2: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
