# Preval test case

# math_fround_call_ctx_spread_second.md

> Builtins cases > Ai math > Math fround call ctx spread second
>
> Test Math.fround called with .call and object context, spread as second argument (three values, only first is used)

## Input

`````js filename=intro
$(Math.fround.call({}, 8.88, ...$([9.99, 10.1, 11.11])));
// Expected: 8.880000114440918
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [9.99, 10.1, 11.11];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(8.880000114440918);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([9.99, 10.1, 11.11]);
[...tmpMCSP];
[...tmpMCSP];
$(8.880000114440918);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 9.99, 10.1, 11.11 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( 8.880000114440918 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $Math_fround;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [9.99, 10.1, 11.11];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 8.88, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Math_fround


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [9.99, 10.1, 11.11]
 - 2: 8.880000114440918
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
