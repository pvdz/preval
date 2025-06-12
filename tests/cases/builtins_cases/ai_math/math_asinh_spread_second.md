# Preval test case

# math_asinh_spread_second.md

> Builtins cases > Ai math > Math asinh spread second
>
> Test Math.asinh called directly with spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.asinh(3, ...$([4, 5, 6])));
// Expected: 1.8184464592320668
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [4, 5, 6];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(1.8184464592320668);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([4, 5, 6]);
[...tmpMCSP];
[...tmpMCSP];
$(1.8184464592320668);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 4, 5, 6 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 1.8184464592320668 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_asinh;
let tmpCalleeParam$1 = [4, 5, 6];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `asinh`, 3, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_asinh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [4, 5, 6]
 - 2: 1.8184464592320668
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
