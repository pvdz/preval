# Preval test case

# math_ceil_spread_second_4args.md

> Builtins cases > Ai math > Math ceil spread second 4args
>
> Test Math.ceil called directly with spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.ceil(3.7, ...$([4.8, 5.9, 6.1, 7.2])));
// Expected: 4
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [4.8, 5.9, 6.1, 7.2];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([4.8, 5.9, 6.1, 7.2]);
[...tmpMCSP];
[...tmpMCSP];
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 4.8, 5.9, 6.1, 7.2 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_ceil;
let tmpCalleeParam$1 = [4.8, 5.9, 6.1, 7.2];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `ceil`, 3.7, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_ceil


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [4.8, 5.9, 6.1, 7.2]
 - 2: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
