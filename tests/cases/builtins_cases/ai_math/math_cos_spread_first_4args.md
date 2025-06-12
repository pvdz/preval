# Preval test case

# math_cos_spread_first_4args.md

> Builtins cases > Ai math > Math cos spread first 4args
>
> Test Math.cos called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.cos(...$([3, 4, 5, 6])));
// Expected: -0.9899924966004454
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [3, 4, 5, 6];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_cos(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([3, 4, 5, 6]);
[...tmpMCSP];
$($Math_cos(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 3, 4, 5, 6 ];
const b = $( a );
[ ...b ];
const c = $Math_cos( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cos;
let tmpCalleeParam$1 = [3, 4, 5, 6];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `cos`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_cos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [3, 4, 5, 6]
 - 2: -0.9899924966004454
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
