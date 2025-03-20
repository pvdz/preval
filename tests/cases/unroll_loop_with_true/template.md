# Preval test case

# template.md

> Unroll loop with true > Template
>
>

## Input

`````js filename=intro
const x = `is it ${$LOOP_DONE_UNROLLING_ALWAYS_TRUE} that stuff`;
$(x);
`````


## Settled


`````js filename=intro
$(`is it true that stuff`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`is it true that stuff`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "is it true that stuff" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'is it true that stuff'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
