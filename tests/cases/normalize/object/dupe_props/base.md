# Preval test case

# base.md

> Normalize > Object > Dupe props > Base
>
> Duplicate properties are legal but useless. We should get rid of them.

## Input

`````js filename=intro
const x = {a: 1, a: 2};
$(x);
`````


## Settled


`````js filename=intro
const x /*:object*/ = { a: 2 };
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: 2 };
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
