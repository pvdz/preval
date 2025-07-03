# Preval test case

# math_hypot_spread_first_4args.md

> Builtins cases > Ai math > Math hypot spread first 4args
>
> Test Math.hypot called directly with spread as first argument (four values)

## Input

`````js filename=intro
$(Math.hypot(...$([1, 2, 3, 4])));
// Expected: 5.477225575051661
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1, 2, 3, 4];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_hypot(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([1, 2, 3, 4]);
[...tmpMCSP];
$($Math_hypot(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
const b = $( a );
[ ...b ];
const c = $Math_hypot( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_hypot;
let tmpCalleeParam$1 = [1, 2, 3, 4];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `hypot`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_hypot


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3, 4]
 - 2: 5.477225575051661
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
