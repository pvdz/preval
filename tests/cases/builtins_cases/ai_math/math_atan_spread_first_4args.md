# Preval test case

# math_atan_spread_first_4args.md

> Builtins cases > Ai math > Math atan spread first 4args
>
> Test Math.atan called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.atan(...$([5, 6, 7, 8])));
// Expected: 1.373400766945016
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [5, 6, 7, 8];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_atan(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([5, 6, 7, 8]);
[...tmpMCSP];
$($Math_atan(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 5, 6, 7, 8 ];
const b = $( a );
[ ...b ];
const c = $Math_atan( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_atan;
let tmpCalleeParam$1 = [5, 6, 7, 8];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `atan`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_atan


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [5, 6, 7, 8]
 - 2: 1.373400766945016
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
