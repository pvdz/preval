# Preval test case

# math_atanh_spread_first_4args.md

> Builtins cases > Ai math > Math atanh spread first 4args
>
> Test Math.atanh called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.atanh(...$([0.9, 0.1, -0.5, 0.7])));
// Expected: 1.4722194895832204
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [0.9, 0.1, -0.5, 0.7];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_atanh(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([0.9, 0.1, -0.5, 0.7]);
[...tmpMCSP];
$($Math_atanh(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0.9, 0.1, -0.5, 0.7 ];
const b = $( a );
[ ...b ];
const c = $Math_atanh( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_atanh;
let tmpCalleeParam$1 = [0.9, 0.1, -0.5, 0.7];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `atanh`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_atanh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [0.9, 0.1, -0.5, 0.7]
 - 2: 1.4722194895832204
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
