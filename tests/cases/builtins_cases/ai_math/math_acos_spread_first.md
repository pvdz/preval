# Preval test case

# math_acos_spread_first.md

> Builtins cases > Ai math > Math acos spread first
>
> Test Math.acos called directly with spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.acos(...$([0.6, 0.2, -0.8])));
// Expected: 0.9272952180016123
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [0.6, 0.2, -0.8];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_acos(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([0.6, 0.2, -0.8]);
[...tmpMCSP];
$($Math_acos(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0.6, 0.2, -0.8 ];
const b = $( a );
[ ...b ];
const c = $Math_acos( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_acos;
let tmpCalleeParam$1 = [0.6, 0.2, -0.8];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `acos`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_acos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [0.6, 0.2, -0.8]
 - 2: 0.9272952180016123
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
