# Preval test case

# mem_static_computed_prop_lhs.md

> Normalize > Member access > Mem static computed prop lhs
>
> assigning to member expression where the lhs is a computed member expression with a static property

## Input

`````js filename=intro
const obj = {x: 1};
obj['x'] = 2;
$(obj);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { x: 2 };
$(obj);
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
const obj = { x: 2 };
$(obj);
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
