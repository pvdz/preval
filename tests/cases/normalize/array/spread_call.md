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
const tmpCalleeParam /*:array*/ = [...tmpArrSpread];
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
