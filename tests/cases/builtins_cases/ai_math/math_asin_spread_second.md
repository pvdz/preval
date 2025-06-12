# Preval test case

# math_asin_spread_second.md

> Builtins cases > Ai math > Math asin spread second
>
> Test Math.asin called directly with spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.asin(0.3, ...$([0.5, 0.7, 0.9])));
// Expected: 0.3046926540153975
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [0.5, 0.7, 0.9];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(0.3046926540153975);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([0.5, 0.7, 0.9]);
[...tmpMCSP];
[...tmpMCSP];
$(0.3046926540153975);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0.5, 0.7, 0.9 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 0.3046926540153975 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_asin;
let tmpCalleeParam$1 = [0.5, 0.7, 0.9];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `asin`, 0.3, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_asin


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [0.5, 0.7, 0.9]
 - 2: 0.3046926540153975
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
