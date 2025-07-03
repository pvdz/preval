# Preval test case

# math_cbrt_spread_second_4args.md

> Builtins cases > Ai math > Math cbrt spread second 4args
>
> Test Math.cbrt called directly with spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.cbrt(125, ...$([216, 343, 512, 729])));
// Expected: 5
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [216, 343, 512, 729];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([216, 343, 512, 729]);
[...tmpMCSP];
[...tmpMCSP];
$(5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 216, 343, 512, 729 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cbrt;
let tmpCalleeParam$1 = [216, 343, 512, 729];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `cbrt`, 125, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_cbrt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [216, 343, 512, 729]
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
