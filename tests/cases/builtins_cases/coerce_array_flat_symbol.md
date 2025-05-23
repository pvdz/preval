# Preval test case

# coerce_array_flat_symbol.md

> Builtins cases > Coerce array flat symbol
>
>

## Input

`````js filename=intro
const x = $coerce($array_flat, 'plustr')
$(x);
`````


## Settled


`````js filename=intro
$(`function flat() { [native code] }`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`function flat() { [native code] }`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "function flat() { [native code] }" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $coerce($array_flat, `plustr`);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'function() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
