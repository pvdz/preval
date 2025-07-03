# Preval test case

# string_toUpperCase_spread_second_4args.md

> Builtins cases > Ai string > String toUpperCase spread second 4args
>
> Test String.prototype.toUpperCase called directly with spread as second argument (four values)

## Input

`````js filename=intro
$("AbC".toUpperCase(1, ...$([2, 3, 4, 5])));
// Expected: "ABC"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [2, 3, 4, 5];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
$(`ABC`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([2, 3, 4, 5]);
[...tmpMCSP];
$(`ABC`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2, 3, 4, 5 ];
const b = $( a );
[ ...b ];
$( "ABC" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_toUpperCase;
let tmpCalleeParam$1 = [2, 3, 4, 5];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `AbC`, `toUpperCase`, 1, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $string_toUpperCase


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 3, 4, 5]
 - 2: 'ABC'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
