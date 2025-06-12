# Preval test case

# math_exp_spread_second.md

> Builtins cases > Ai math > Math exp spread second
>
> Test Math.exp called directly with spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.exp(4, ...$([5, 6, 7])));
// Expected: 54.598150033144236
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [5, 6, 7];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(54.598150033144236);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([5, 6, 7]);
[...tmpMCSP];
[...tmpMCSP];
$(54.598150033144236);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 5, 6, 7 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 54.598150033144236 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_exp;
let tmpCalleeParam$1 = [5, 6, 7];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `exp`, 4, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_exp


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [5, 6, 7]
 - 2: 54.598150033144236
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
