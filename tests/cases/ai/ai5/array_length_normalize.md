# Preval test case

# array_length_normalize.md

> Ai > Ai5 > Array length normalize
>
> Test normalization of array length access

## Input

`````js filename=intro
const arr = [1, 2, 3];
const x = arr["length"];
$(x);

// Expected:
// const arr = [1, 2, 3];
// const x = arr.length;
// $(x);
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
const x = arr.length;
$(x);
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
