# Preval test case

# _base_prop_obj.md

> Normalize > Nullish > Base prop obj
>
> Simple example

## Input

`````js filename=intro
var f = {x: 10};
$(f??x);
`````


## Settled


`````js filename=intro
const f /*:object*/ = { x: 10 };
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 10 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 10 };
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
