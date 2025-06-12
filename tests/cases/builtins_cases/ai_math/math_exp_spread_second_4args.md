# Preval test case

# math_exp_spread_second_4args.md

> Builtins cases > Ai math > Math exp spread second 4args
>
> Test Math.exp called directly with spread as second argument (four values, only first is used)

## Input

`````js filename=intro
$(Math.exp(5, ...$([6, 7, 8, 9])));
// Expected: 148.4131591025766
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [6, 7, 8, 9];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(148.4131591025766);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([6, 7, 8, 9]);
[...tmpMCSP];
[...tmpMCSP];
$(148.4131591025766);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 6, 7, 8, 9 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 148.4131591025766 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_exp;
let tmpCalleeParam$1 = [6, 7, 8, 9];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `exp`, 5, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_exp


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [6, 7, 8, 9]
 - 2: 148.4131591025766
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
