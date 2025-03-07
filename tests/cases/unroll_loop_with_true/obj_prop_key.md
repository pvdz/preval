# Preval test case

# obj_prop_key.md

> Unroll loop with true > Obj prop key
>
>

## Input

`````js filename=intro
const x = {[$LOOP_DONE_UNROLLING_ALWAYS_TRUE]: 'haha'};
$(x);
`````

## Settled


`````js filename=intro
const x /*:object*/ = { [true]: `haha` };
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [true]: `haha` });
`````

## Pre Normal


`````js filename=intro
const x = { [$LOOP_DONE_UNROLLING_ALWAYS_TRUE]: `haha` };
$(x);
`````

## Normalized


`````js filename=intro
const x = { [true]: `haha` };
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { [ true ]: "haha" };
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { true: '"haha"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
