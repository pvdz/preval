# Preval test case

# math_atan2_spread_second_4args.md

> Builtins cases > Ai math > Math atan2 spread second 4args
>
> Test Math.atan2 called directly with spread as second argument (four values, only first two are used)

## Input

`````js filename=intro
$(Math.atan2(7, ...$([8, 9, 10, 11])));
// Expected: 0.7188299996216245
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [8, 9, 10, 11];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_atan2(7, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([8, 9, 10, 11]);
[...tmpMCSP];
$($Math_atan2(7, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 8, 9, 10, 11 ];
const b = $( a );
[ ...b ];
const c = $Math_atan2( 7, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_atan2;
let tmpCalleeParam$1 = [8, 9, 10, 11];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `atan2`, 7, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_atan2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [8, 9, 10, 11]
 - 2: 0.7188299996216245
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
