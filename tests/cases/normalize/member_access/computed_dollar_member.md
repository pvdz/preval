# Preval test case

# computed_dollar_member.md

> Normalize > Member access > Computed dollar member
>
> Regression: computed property name of dollar was not inlined

## Input

`````js filename=intro
const a = {['$']: 1};
$(a['$']);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = { $: 1 };
let tmpCalleeParam = a.$;
$(tmpCalleeParam);
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
