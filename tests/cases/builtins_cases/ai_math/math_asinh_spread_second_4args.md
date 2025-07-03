# Preval test case

# math_asinh_spread_second_4args.md

> Builtins cases > Ai math > Math asinh spread second 4args
>
> Test Math.asinh called directly with spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.asinh(6, ...$([7, 8, 9, 10])));
// Expected: 2.477888730288475
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [7, 8, 9, 10];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(2.491779852644912);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([7, 8, 9, 10]);
[...tmpMCSP];
[...tmpMCSP];
$(2.491779852644912);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 7, 8, 9, 10 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 2.491779852644912 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_asinh;
let tmpCalleeParam$1 = [7, 8, 9, 10];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `asinh`, 6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_asinh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [7, 8, 9, 10]
 - 2: 2.491779852644912
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
