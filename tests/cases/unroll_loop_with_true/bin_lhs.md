# Preval test case

# bin_lhs.md

> Unroll loop with true > Bin lhs
>
>

## Input

`````js filename=intro
const x = $LOOP_DONE_UNROLLING_ALWAYS_TRUE + 1;
$(x);
`````

## Pre Normal


`````js filename=intro
const x = $LOOP_DONE_UNROLLING_ALWAYS_TRUE + 1;
$(x);
`````

## Normalized


`````js filename=intro
const x = 2;
$(x);
`````

## Output


`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
