# Preval test case

# math_atan2_spread_second.md

> Builtins cases > Ai math > Math atan2 spread second
>
> Test Math.atan2 called directly with spread as second argument (three values, only first two are used)

## Input

`````js filename=intro
$(Math.atan2(4, ...$([5, 6, 7])));
// Expected: 0.6747409422235526
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [5, 6, 7];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_atan2(4, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([5, 6, 7]);
[...tmpMCSP];
$($Math_atan2(4, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 5, 6, 7 ];
const b = $( a );
[ ...b ];
const c = $Math_atan2( 4, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_atan2;
let tmpCalleeParam$1 = [5, 6, 7];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `atan2`, 4, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_atan2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [5, 6, 7]
 - 2: 0.6747409422235527
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
