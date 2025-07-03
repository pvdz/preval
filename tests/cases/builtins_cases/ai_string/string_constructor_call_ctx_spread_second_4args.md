# Preval test case

# string_constructor_call_ctx_spread_second_4args.md

> Builtins cases > Ai string > String constructor call ctx spread second 4args
>
> Test String() called with .call and object context, spread as second argument (four values)

## Input

`````js filename=intro
$(String.call({}, 123, ...$([456, 789, 0])));
// Expected: "123"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [456, 789, 0];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
[...tmpMCSP];
$(`123`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([456, 789, 0]);
[...tmpMCSP];
[...tmpMCSP];
$(`123`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 456, 789, 0 ];
const b = $( a );
[ ...b ];
[ ...b ];
$( "123" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = String.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [456, 789, 0];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, $string_constructor, `call`, tmpMCP, 123, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $string_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [456, 789, 0]
 - 2: '123'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
