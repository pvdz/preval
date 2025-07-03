# Preval test case

# math_ceil_spread_first_4args.md

> Builtins cases > Ai math > Math ceil spread first 4args
>
> Test Math.ceil called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.ceil(...$([2.5, 3.5, 4.5, 5.5])));
// Expected: 3
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [2.5, 3.5, 4.5, 5.5];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_ceil(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([2.5, 3.5, 4.5, 5.5]);
[...tmpMCSP];
$($Math_ceil(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2.5, 3.5, 4.5, 5.5 ];
const b = $( a );
[ ...b ];
const c = $Math_ceil( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_ceil;
let tmpCalleeParam$1 = [2.5, 3.5, 4.5, 5.5];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `ceil`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_ceil


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2.5, 3.5, 4.5, 5.5]
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
