# Preval test case

# math_fround_spread_first_4args.md

> Builtins cases > Ai math > Math fround spread first 4args
>
> Test Math.fround called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.fround(...$([3.14, 2.71, 1.41, 1.73])));
// Expected: 3.140000104904175
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [3.14, 2.71, 1.41, 1.73];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_fround(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([3.14, 2.71, 1.41, 1.73]);
[...tmpMCSP];
$($Math_fround(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 3.14, 2.71, 1.41, 1.73 ];
const b = $( a );
[ ...b ];
const c = $Math_fround( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_fround;
let tmpCalleeParam$1 = [3.14, 2.71, 1.41, 1.73];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `fround`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_fround


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [3.14, 2.71, 1.41, 1.73]
 - 2: 3.140000104904175
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
