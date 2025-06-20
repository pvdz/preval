# Preval test case

# string_constructor_spread_first.md

> Builtins cases > Ai string > String constructor spread first
>
> Test String() called directly with spread as first argument (three values)

## Input

`````js filename=intro
$(String(...$([123, 456, 789])));
// Expected: "123"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [123, 456, 789];
const tmpCalleeParamSpread /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = $string_constructor(...tmpCalleeParamSpread);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParamSpread = $([123, 456, 789]);
$($string_constructor(...tmpCalleeParamSpread));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 123, 456, 789 ];
const b = $( a );
const c = $string_constructor( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam$1 = [123, 456, 789];
let tmpCalleeParamSpread = $(tmpCalleeParam$1);
let tmpCalleeParam = $string_constructor(...tmpCalleeParamSpread);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $string_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [123, 456, 789]
 - 2: '123'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
