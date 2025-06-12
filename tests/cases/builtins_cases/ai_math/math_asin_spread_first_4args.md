# Preval test case

# math_asin_spread_first_4args.md

> Builtins cases > Ai math > Math asin spread first 4args
>
> Test Math.asin called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.asin(...$([0.9, 0.1, -0.5, 0.7])));
// Expected: 1.1197695149986342
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [0.9, 0.1, -0.5, 0.7];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_asin(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([0.9, 0.1, -0.5, 0.7]);
[...tmpMCSP];
$($Math_asin(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0.9, 0.1, -0.5, 0.7 ];
const b = $( a );
[ ...b ];
const c = $Math_asin( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_asin;
let tmpCalleeParam$1 = [0.9, 0.1, -0.5, 0.7];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `asin`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_asin


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [0.9, 0.1, -0.5, 0.7]
 - 2: 1.1197695149986342
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
