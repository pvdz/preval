# Preval test case

# math_asinh_spread_first_4args.md

> Builtins cases > Ai math > Math asinh spread first 4args
>
> Test Math.asinh called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.asinh(...$([5, 6, 7, 8])));
// Expected: 2.3124383412727525
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [5, 6, 7, 8];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_asinh(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([5, 6, 7, 8]);
[...tmpMCSP];
$($Math_asinh(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 5, 6, 7, 8 ];
const b = $( a );
[ ...b ];
const c = $Math_asinh( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_asinh;
let tmpCalleeParam$1 = [5, 6, 7, 8];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `asinh`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_asinh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [5, 6, 7, 8]
 - 2: 2.3124383412727525
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
