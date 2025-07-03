# Preval test case

# math_hypot_spread_second.md

> Builtins cases > Ai math > Math hypot spread second
>
> Test Math.hypot called directly with spread as second argument (three values)

## Input

`````js filename=intro
$(Math.hypot(5, ...$([12, 13, 84])));
// Expected: 85
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [12, 13, 84];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_hypot(5, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([12, 13, 84]);
[...tmpMCSP];
$($Math_hypot(5, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 12, 13, 84 ];
const b = $( a );
[ ...b ];
const c = $Math_hypot( 5, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_hypot;
let tmpCalleeParam$1 = [12, 13, 84];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `hypot`, 5, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_hypot


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [12, 13, 84]
 - 2: 85.98837130682266
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
