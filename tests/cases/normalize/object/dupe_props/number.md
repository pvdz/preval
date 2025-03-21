# Preval test case

# number.md

> Normalize > Object > Dupe props > Number
>
> Duplicate properties are legal but useless. We should get rid of them.

## Input

`````js filename=intro
const x = {5: 1, 5: 2};
$(x);
`````


## Settled


`````js filename=intro
const x /*:object*/ = { [5]: 2 };
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [5]: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ 5 ]: 2 };
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 5: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
