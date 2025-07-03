# Preval test case

# math_cosh_spread_second_4args.md

> Builtins cases > Ai math > Math cosh spread second 4args
>
> Test Math.cosh called directly with spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.cosh(5, ...$([6, 7, 8, 9])));
// Expected: 74.20994852478785
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [6, 7, 8, 9];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(74.20994852478785);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([6, 7, 8, 9]);
[...tmpMCSP];
[...tmpMCSP];
$(74.20994852478785);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 6, 7, 8, 9 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 74.20994852478785 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cosh;
let tmpCalleeParam$1 = [6, 7, 8, 9];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `cosh`, 5, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_cosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [6, 7, 8, 9]
 - 2: 74.20994852478785
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
