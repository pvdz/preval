# Preval test case

# math_hypot_spread_second_4args.md

> Builtins cases > Ai math > Math hypot spread second 4args
>
> Test Math.hypot called directly with spread as second argument (four values)

## Input

`````js filename=intro
$(Math.hypot(2, ...$([3, 6, 8, 10])));
// Expected: 12.328828005937952
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [3, 6, 8, 10];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_hypot(2, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([3, 6, 8, 10]);
[...tmpMCSP];
$($Math_hypot(2, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 3, 6, 8, 10 ];
const b = $( a );
[ ...b ];
const c = $Math_hypot( 2, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_hypot;
let tmpCalleeParam$1 = [3, 6, 8, 10];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `hypot`, 2, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_hypot


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [3, 6, 8, 10]
 - 2: 14.594519519326424
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
