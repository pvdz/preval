# Preval test case

# stmt_call.md

> Unroll loop with true > Stmt call
>
>

## Input

`````js filename=intro
$($LOOP_DONE_UNROLLING_ALWAYS_TRUE);
`````

## Settled


`````js filename=intro
$(true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````

## Pre Normal


`````js filename=intro
$($LOOP_DONE_UNROLLING_ALWAYS_TRUE);
`````

## Normalized


`````js filename=intro
$(true);
`````

## PST Settled
With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
