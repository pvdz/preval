# Preval test case

# math_fround_spread_second.md

> Builtins cases > Ai math > Math fround spread second
>
> Test Math.fround called directly with spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.fround(4.2, ...$([5.3, 6.4, 7.5])));
// Expected: 4.199999809265137
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [5.3, 6.4, 7.5];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(4.199999809265137);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([5.3, 6.4, 7.5]);
[...tmpMCSP];
[...tmpMCSP];
$(4.199999809265137);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 5.3, 6.4, 7.5 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 4.199999809265137 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_fround;
let tmpCalleeParam$1 = [5.3, 6.4, 7.5];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `fround`, 4.2, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_fround


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [5.3, 6.4, 7.5]
 - 2: 4.199999809265137
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
