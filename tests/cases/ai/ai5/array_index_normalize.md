# Preval test case

# array_index_normalize.md

> Ai > Ai5 > Array index normalize
>
> Test normalization of array index access

## Input

`````js filename=intro
const arr = [1, 2, 3];
const x = arr[0];
const y = arr[1];
$(x + y);

// Expected:
// const arr = [1, 2, 3];
// const x = arr.0;
// const y = arr.1;
// $(x + y);
`````


## Settled


`````js filename=intro
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const x = arr[0];
const y = arr[1];
let tmpCalleeParam = x + y;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
