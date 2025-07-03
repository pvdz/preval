# Preval test case

# math_acosh_spread_first.md

> Builtins cases > Ai math > Math acosh spread first
>
> Test Math.acosh called directly with spread as first argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.acosh(...$([2, 3, 4])));
// Expected: 1.3169578969248166
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [2, 3, 4];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_acosh(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([2, 3, 4]);
[...tmpMCSP];
$($Math_acosh(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2, 3, 4 ];
const b = $( a );
[ ...b ];
const c = $Math_acosh( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_acosh;
let tmpCalleeParam$1 = [2, 3, 4];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `acosh`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_acosh


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 3, 4]
 - 2: 1.3169578969248166
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
