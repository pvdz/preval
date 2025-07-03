# Preval test case

# math_acos_spread_second_4args.md

> Builtins cases > Ai math > Math acos spread second 4args
>
> Test Math.acos called directly with spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.acos(-0.2, ...$([0.4, 0.6, 0.8, 1.0])));
// Expected: 1.7721542475852274
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [0.4, 0.6, 0.8, 1];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(1.7721542475852274);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([0.4, 0.6, 0.8, 1]);
[...tmpMCSP];
[...tmpMCSP];
$(1.7721542475852274);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0.4, 0.6, 0.8, 1 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 1.7721542475852274 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_acos;
let tmpCalleeParam$1 = [0.4, 0.6, 0.8, 1];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `acos`, -0.2, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_acos


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [0.4, 0.6, 0.8, 1]
 - 2: 1.7721542475852274
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
