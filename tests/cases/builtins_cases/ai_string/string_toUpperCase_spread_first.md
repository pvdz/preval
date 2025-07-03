# Preval test case

# string_toUpperCase_spread_first.md

> Builtins cases > Ai string > String toUpperCase spread first
>
> Test String.prototype.toUpperCase called directly with spread as first argument (three values)

## Input

`````js filename=intro
$("AbC".toUpperCase(...$([1, 2, 3])));
// Expected: "ABC"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
$(`ABC`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([1, 2, 3]);
[...tmpMCSP];
$(`ABC`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( a );
[ ...b ];
$( "ABC" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_toUpperCase;
let tmpCalleeParam$1 = [1, 2, 3];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `AbC`, `toUpperCase`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $string_toUpperCase


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 'ABC'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
