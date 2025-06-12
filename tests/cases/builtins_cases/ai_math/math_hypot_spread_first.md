# Preval test case

# math_hypot_spread_first.md

> Builtins cases > Ai math > Math hypot spread first
>
> Test Math.hypot called directly with spread as first argument (three values)

## Input

`````js filename=intro
$(Math.hypot(...$([3, 4, 12])));
// Expected: 13
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [3, 4, 12];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_hypot(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([3, 4, 12]);
[...tmpMCSP];
$($Math_hypot(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 3, 4, 12 ];
const b = $( a );
[ ...b ];
const c = $Math_hypot( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_hypot;
let tmpCalleeParam$1 = [3, 4, 12];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `hypot`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_hypot


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [3, 4, 12]
 - 2: 13
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
