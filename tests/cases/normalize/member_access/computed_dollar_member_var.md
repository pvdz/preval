# Preval test case

# computed_dollar_member_var.md

> Normalize > Member access > Computed dollar member var
>
> Regression: computed property name of dollar was not inlined

## Input

`````js filename=intro
const a = {['$']: 1};
const b = a['$'];
$(b);
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
