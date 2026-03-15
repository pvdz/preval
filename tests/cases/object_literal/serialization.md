# Preval test case

# serialization.md

> Object literal > Serialization
>
> tostring

## Input

`````js filename=intro
const a = {};
const b = $coerce(a, `plustr`);
$(b);
`````


## Settled


`````js filename=intro
$(`[object Object]`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`[object Object]`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "[object Object]" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = {};
const b = $coerce(a, `plustr`);
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '[object Object]'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
