# Preval test case

# empty_array_number.md

> Coerce > Array > Empty array number

## Input

`````js filename=intro
const a = [];
const b = $coerce(a, 'number');
$(b);
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = [];
const b = $coerce(a, `number`);
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
