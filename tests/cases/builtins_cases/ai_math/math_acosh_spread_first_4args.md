# Preval test case

# math_acosh_spread_first_4args.md

> Builtins cases > Ai math > Math acosh spread first 4args
>
> Test Math.acosh called directly with spread as first argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.acosh(...$([5, 6, 7, 8])));
// Expected: 2.2924316695611777
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [5, 6, 7, 8];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:number*/ = $Math_acosh(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([5, 6, 7, 8]);
[...tmpMCSP];
$($Math_acosh(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 5, 6, 7, 8 ];
const b = $( a );
[ ...b ];
const c = $Math_acosh( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_acosh;
let tmpCalleeParam$1 = [5, 6, 7, 8];
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
 - 1: [5, 6, 7, 8]
 - 2: 2.2924316695611777
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
