# Preval test case

# global_group_literal.md

> Normalize > Nullish > Global group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
const y = (1, 2, 3)??foo
$(y);
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
