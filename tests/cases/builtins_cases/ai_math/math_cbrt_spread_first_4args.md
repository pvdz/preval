# Preval test case

# math_cbrt_spread_first_4args.md

> Builtins cases > Ai math > Math cbrt spread first 4args
>
> Test Math.cbrt called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.cbrt(...$([8, 27, 64, 125])));
// Expected: 2
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [8, 27, 64, 125];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_cbrt(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([8, 27, 64, 125]);
[...tmpMCSP];
$($Math_cbrt(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 8, 27, 64, 125 ];
const b = $( a );
[ ...b ];
const c = $Math_cbrt( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_cbrt;
let tmpCalleeParam$1 = [8, 27, 64, 125];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `cbrt`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_cbrt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [8, 27, 64, 125]
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
