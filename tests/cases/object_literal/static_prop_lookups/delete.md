# Preval test case

# delete.md

> Object literal > Static prop lookups > Delete
>
> When the prop is an argument to `delet` it is not a read and we should skip

## Input

`````js filename=intro
const obj = {x: 1};
delete obj.x;
$(obj);
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { x: 1 };
delete obj.x;
$(obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = { x: 1 };
delete obj.x;
$(obj);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
delete a.x;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { x: 1 };
delete obj.x;
$(obj);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
