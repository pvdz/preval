# Preval test case

# serialization_props_multi_use.md

> Object literal > Serialization props multi use
>
> tostring

## Input

`````js filename=intro
const a = {x: 1, y: "twee"};
const b = $coerce(a, `plustr`);
$(b);
const c = $coerce(a, `plustr`);
$(c);
`````


## Settled


`````js filename=intro
$(`[object Object]`);
$(`[object Object]`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`[object Object]`);
$(`[object Object]`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "[object Object]" );
$( "[object Object]" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = { x: 1, y: `twee` };
const b = $coerce(a, `plustr`);
$(b);
const c = $coerce(a, `plustr`);
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '[object Object]'
 - 2: '[object Object]'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
