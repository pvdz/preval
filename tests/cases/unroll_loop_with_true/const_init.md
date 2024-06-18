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

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
