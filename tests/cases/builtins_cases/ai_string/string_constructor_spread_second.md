# Preval test case

# string_constructor_spread_second.md

> Builtins cases > Ai string > String constructor spread second
>
> Test String() called directly with spread as second argument (three values)

## Input

`````js filename=intro
$(String(123, ...$([456, 789])));
// Expected: "123"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [456, 789];
const tmpArrElToSpread /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpArrElToSpread];
$(`123`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElToSpread = $([456, 789]);
[...tmpArrElToSpread];
$(`123`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 456, 789 ];
const b = $( a );
[ ...b ];
$( "123" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArgOverflow = 123;
let tmpCalleeParam$1 = [456, 789];
const tmpArrElToSpread = $(tmpCalleeParam$1);
[...tmpArrElToSpread];
let tmpCalleeParam = $coerce(tmpArgOverflow, `string`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [456, 789]
 - 2: '123'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
