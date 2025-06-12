# Preval test case

# math_cbrt_spread_second.md

> Builtins cases > Ai math > Math cbrt spread second
>
> Test Math.cbrt called directly with spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.cbrt(64, ...$([125, 216, 343])));
// Expected: 4
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [125, 216, 343];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([125, 216, 343]);
[...tmpMCSP];
[...tmpMCSP];
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 125, 216, 343 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cbrt;
let tmpCalleeParam$1 = [125, 216, 343];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `cbrt`, 64, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_cbrt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [125, 216, 343]
 - 2: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
