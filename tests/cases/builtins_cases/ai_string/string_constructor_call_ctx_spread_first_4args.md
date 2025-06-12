# Preval test case

# string_constructor_call_ctx_spread_first_4args.md

> Builtins cases > Ai string > String constructor call ctx spread first 4args
>
> Test String() called with .call and object context, spread as first argument (four values)

## Input

`````js filename=intro
$(String.call({}, ...$([123, 456, 789, 0])));
// Expected: "123"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [123, 456, 789, 0];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:string*/ = $string_constructor(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([123, 456, 789, 0]);
[...tmpMCSP];
$($string_constructor(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 123, 456, 789, 0 ];
const b = $( a );
[ ...b ];
const c = $string_constructor( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = String.call;
const tmpMCP = {};
let tmpCalleeParam$1 = [123, 456, 789, 0];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, $string_constructor, `call`, tmpMCP, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $string_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [123, 456, 789, 0]
 - 2: '123'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
