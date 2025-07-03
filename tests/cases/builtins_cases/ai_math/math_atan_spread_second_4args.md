# Preval test case

# math_atan_spread_second_4args.md

> Builtins cases > Ai math > Math atan spread second 4args
>
> Test Math.atan called directly with spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.atan(6, ...$([7, 8, 9, 10])));
// Expected: 1.4056476493802699
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [7, 8, 9, 10];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(1.4056476493802699);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([7, 8, 9, 10]);
[...tmpMCSP];
[...tmpMCSP];
$(1.4056476493802699);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 7, 8, 9, 10 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 1.4056476493802699 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_atan;
let tmpCalleeParam$1 = [7, 8, 9, 10];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `atan`, 6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_atan


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [7, 8, 9, 10]
 - 2: 1.4056476493802699
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
