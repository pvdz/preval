# Preval test case

# math_fround_spread_second_4args.md

> Builtins cases > Ai math > Math fround spread second 4args
>
> Test Math.fround called directly with spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.fround(5.6, ...$([6.7, 7.8, 8.9, 9.1])));
// Expected: 5.599999904632568
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [6.7, 7.8, 8.9, 9.1];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(5.599999904632568);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([6.7, 7.8, 8.9, 9.1]);
[...tmpMCSP];
[...tmpMCSP];
$(5.599999904632568);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 6.7, 7.8, 8.9, 9.1 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 5.599999904632568 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_fround;
let tmpCalleeParam$1 = [6.7, 7.8, 8.9, 9.1];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `fround`, 5.6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_fround


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [6.7, 7.8, 8.9, 9.1]
 - 2: 5.599999904632568
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
