# Preval test case

# null_prop.md

> Normalize > Optional > Null prop
>
> Empty string should make `?.` to return undefined.

## Input

`````js filename=intro
$(null?.toString());
`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Todos triggered


- Method on primitive was not found, do we miss anything?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
