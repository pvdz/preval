# Preval test case

# nested_empty_array_plustr.md

> Coerce > Array > Nested empty array plustr

## Input

`````js filename=intro
const a = [];
const b = [a];
const c = $coerce(b, 'plustr');
$(c);
`````


## Settled


`````js filename=intro
$(``);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = [];
const b = [a];
const c = $coerce(b, `plustr`);
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
