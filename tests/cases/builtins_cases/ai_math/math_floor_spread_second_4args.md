# Preval test case

# math_floor_spread_second_4args.md

> Builtins cases > Ai math > Math floor spread second 4args
>
> Test Math.floor called directly with spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.floor(3.7, ...$([4.8, 5.9, 6.1, 7.2])));
// Expected: 3
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [4.8, 5.9, 6.1, 7.2];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([4.8, 5.9, 6.1, 7.2]);
[...tmpMCSP];
[...tmpMCSP];
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 4.8, 5.9, 6.1, 7.2 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_floor;
let tmpCalleeParam$1 = [4.8, 5.9, 6.1, 7.2];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `floor`, 3.7, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_floor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [4.8, 5.9, 6.1, 7.2]
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
