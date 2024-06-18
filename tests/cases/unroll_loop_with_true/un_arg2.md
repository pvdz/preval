# Preval test case

# un_arg2.md

> Unroll loop with true > Un arg2
>
> 

## Input

`````js filename=intro
const x = +$LOOP_DONE_UNROLLING_ALWAYS_TRUE;
$(x);
`````

## Pre Normal


`````js filename=intro
const x = +$LOOP_DONE_UNROLLING_ALWAYS_TRUE;
$(x);
`````

## Normalized


`````js filename=intro
const x = 1;
$(x);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
