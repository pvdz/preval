# Preval test case

# math_abs_spread_first_4args.md

> Builtins cases > Ai math > Math abs spread first 4args
>
> Test Math.abs called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.abs(...$([-11, 3, 7, 0])));
// Expected: 11
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [-11, 3, 7, 0];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_abs(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([-11, 3, 7, 0]);
[...tmpMCSP];
$($Math_abs(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -11, 3, 7, 0 ];
const b = $( a );
[ ...b ];
const c = $Math_abs( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_abs;
let tmpCalleeParam$1 = [-11, 3, 7, 0];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `abs`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [-11, 3, 7, 0]
 - 2: 11
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
