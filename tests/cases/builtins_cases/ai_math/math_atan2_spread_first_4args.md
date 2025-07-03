# Preval test case

# math_atan2_spread_first_4args.md

> Builtins cases > Ai math > Math atan2 spread first 4args
>
> Test Math.atan2 called directly with spread as first argument (four values, only first two are used)

## Input

`````js filename=intro
$(Math.atan2(...$([6, 7, 8, 9])));
// Expected: 0.7086262721276703
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [6, 7, 8, 9];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_atan2(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([6, 7, 8, 9]);
[...tmpMCSP];
$($Math_atan2(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 6, 7, 8, 9 ];
const b = $( a );
[ ...b ];
const c = $Math_atan2( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_atan2;
let tmpCalleeParam$1 = [6, 7, 8, 9];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `atan2`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_atan2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [6, 7, 8, 9]
 - 2: 0.7086262721276703
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
