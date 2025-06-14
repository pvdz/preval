# Preval test case

# spread_call.md

> Normalize > Array > Spread call
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
$([...$("foo")]);
`````


## Settled


`````js filename=intro
const tmpArrSpread /*:unknown*/ = $(`foo`);
const tmpCalleeParam /*:array*/ /*truthy*/ = [...tmpArrSpread];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrSpread = $(`foo`);
$([...tmpArrSpread]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
const b = [ ...a ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrSpread = $(`foo`);
let tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - 2: ['f', 'o', 'o']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
