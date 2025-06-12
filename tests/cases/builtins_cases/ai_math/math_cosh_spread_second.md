# Preval test case

# math_cosh_spread_second.md

> Builtins cases > Ai math > Math cosh spread second
>
> Test Math.cosh called directly with spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.cosh(4, ...$([5, 6, 7])));
// Expected: 27.308232836016487
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [5, 6, 7];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(27.308232836016487);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([5, 6, 7]);
[...tmpMCSP];
[...tmpMCSP];
$(27.308232836016487);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 5, 6, 7 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 27.308232836016487 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cosh;
let tmpCalleeParam$1 = [5, 6, 7];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `cosh`, 4, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_cosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [5, 6, 7]
 - 2: 27.308232836016487
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
