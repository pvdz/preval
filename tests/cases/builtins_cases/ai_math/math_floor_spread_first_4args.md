# Preval test case

# math_floor_spread_first_4args.md

> Builtins cases > Ai math > Math floor spread first 4args
>
> Test Math.floor called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.floor(...$([2.5, 3.5, 4.5, 5.5])));
// Expected: 2
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [2.5, 3.5, 4.5, 5.5];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_floor(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([2.5, 3.5, 4.5, 5.5]);
[...tmpMCSP];
$($Math_floor(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2.5, 3.5, 4.5, 5.5 ];
const b = $( a );
[ ...b ];
const c = $Math_floor( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_floor;
let tmpCalleeParam$1 = [2.5, 3.5, 4.5, 5.5];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `floor`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_floor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2.5, 3.5, 4.5, 5.5]
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
