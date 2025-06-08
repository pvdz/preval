# Preval test case

# string.md

> Normalize > Object > Dupe props > String
>
> Duplicate properties are legal but useless. We should get rid of them.

## Input

`````js filename=intro
const x = {'x': 1, 'x': 2};
$(x);
`````


## Settled


`````js filename=intro
const x /*:object*/ /*truthy*/ = { x: 2 };
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 2 };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = { x: 2 };
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
