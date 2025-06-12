# Preval test case

# math_acosh_spread_second.md

> Builtins cases > Ai math > Math acosh spread second
>
> Test Math.acosh called directly with spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.acosh(3, ...$([4, 5, 6])));
// Expected: 1.762747174039086
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [4, 5, 6];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(1.7627471740390859);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([4, 5, 6]);
[...tmpMCSP];
[...tmpMCSP];
$(1.7627471740390859);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 4, 5, 6 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 1.7627471740390859 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_acosh;
let tmpCalleeParam$1 = [4, 5, 6];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `acosh`, 3, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_acosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [4, 5, 6]
 - 2: 1.7627471740390859
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
