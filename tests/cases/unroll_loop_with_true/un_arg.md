# Preval test case

# un_arg.md

> Unroll loop with true > Un arg
>
>

## Input

`````js filename=intro
const x = typeof $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
$(x);
`````

## Settled


`````js filename=intro
$(`boolean`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`boolean`);
`````

## Pre Normal


`````js filename=intro
const x = typeof $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
$(x);
`````

## Normalized


`````js filename=intro
const x = `boolean`;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "boolean" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
