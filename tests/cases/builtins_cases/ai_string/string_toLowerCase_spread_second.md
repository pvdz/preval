# Preval test case

# string_toLowerCase_spread_second.md

> Builtins cases > Ai string > String toLowerCase spread second
>
> Test String.prototype.toLowerCase called directly with spread as second argument (three values)

## Input

`````js filename=intro
$("AbC".toLowerCase(1, ...$([2, 3, 4])));
// Expected: "abc"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [2, 3, 4];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
$(`abc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([2, 3, 4]);
[...tmpMCSP];
$(`abc`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2, 3, 4 ];
const b = $( a );
[ ...b ];
$( "abc" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_toLowerCase;
let tmpCalleeParam$1 = [2, 3, 4];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `AbC`, `toLowerCase`, 1, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $string_toLowerCase


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 3, 4]
 - 2: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
