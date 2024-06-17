# Preval test case

# arr_element.md

> Unroll loop with true > Arr element
>
> 

#TODO

## Input

`````js filename=intro
const x = [1, $LOOP_DONE_UNROLLING_ALWAYS_TRUE, 3];
$(x);
`````

## Pre Normal


`````js filename=intro
const x = [1, $LOOP_DONE_UNROLLING_ALWAYS_TRUE, 3];
$(x);
`````

## Normalized


`````js filename=intro
const x = [1, true, 3];
$(x);
`````

## Output


`````js filename=intro
const x = [1, true, 3];
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, true, 3 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, true, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
