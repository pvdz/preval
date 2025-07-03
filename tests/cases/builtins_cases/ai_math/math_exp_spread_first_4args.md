# Preval test case

# math_exp_spread_first_4args.md

> Builtins cases > Ai math > Math exp spread first 4args
>
> Test Math.exp called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.exp(...$([3, 4, 5, 6])));
// Expected: 20.085536923187668
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [3, 4, 5, 6];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_exp(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([3, 4, 5, 6]);
[...tmpMCSP];
$($Math_exp(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 3, 4, 5, 6 ];
const b = $( a );
[ ...b ];
const c = $Math_exp( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_exp;
let tmpCalleeParam$1 = [3, 4, 5, 6];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `exp`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_exp


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [3, 4, 5, 6]
 - 2: 20.085536923187668
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
