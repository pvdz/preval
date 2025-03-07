# Preval test case

# computed_member.md

> Unroll loop with true > Computed member
>
>

## Input

`````js filename=intro
$(String[$LOOP_DONE_UNROLLING_ALWAYS_TRUE]);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = String.true;
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(String.true);
`````

## Pre Normal


`````js filename=intro
$(String[$LOOP_DONE_UNROLLING_ALWAYS_TRUE]);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = String.true;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = String.true;
$( a );
`````

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
