# Preval test case

# math_expm1_spread_first_4args.md

> Builtins cases > Ai math > Math expm1 spread first 4args
>
> Test Math.expm1 called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.expm1(...$([3, 4, 5, 6])));
// Expected: 19.085536923187668
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [3, 4, 5, 6];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_expm1(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([3, 4, 5, 6]);
[...tmpMCSP];
$($Math_expm1(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 3, 4, 5, 6 ];
const b = $( a );
[ ...b ];
const c = $Math_expm1( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_expm1;
let tmpCalleeParam$1 = [3, 4, 5, 6];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `expm1`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_expm1


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [3, 4, 5, 6]
 - 2: 19.085536923187668
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
