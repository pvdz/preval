# Preval test case

# const_init.md

> Unroll loop with true > Const init
>
>

## Input

`````js filename=intro
const x = $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
$(x);
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
const x = $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
$(x);
`````

## Normalized


`````js filename=intro
const x = true;
$(x);
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
