# Preval test case

# obj_prop_val.md

> Unroll loop with true > Obj prop val
>
>

## Input

`````js filename=intro
const x = {joke: $LOOP_DONE_UNROLLING_ALWAYS_TRUE};
$(x);
`````

## Pre Normal


`````js filename=intro
const x = { joke: $LOOP_DONE_UNROLLING_ALWAYS_TRUE };
$(x);
`````

## Normalized


`````js filename=intro
const x = { joke: true };
$(x);
`````

## Output


`````js filename=intro
const x /*:object*/ = { joke: true };
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { joke: true };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { joke: 'true' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
