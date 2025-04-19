# Preval test case

# resolve_immediate_access.md

> Array > Static props > Resolve immediate access
>
> The immediate access should be resolved because we can guarantee the value

## Input

`````js filename=intro
const arr = [1];
const v = arr[0];
$(v);
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
