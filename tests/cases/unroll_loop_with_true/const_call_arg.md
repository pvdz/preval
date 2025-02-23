# Preval test case

# const_call_arg.md

> Unroll loop with true > Const call arg
>
>

## Input

`````js filename=intro
const x = $($LOOP_DONE_UNROLLING_ALWAYS_TRUE);
$(x);
`````

## Pre Normal


`````js filename=intro
const x = $($LOOP_DONE_UNROLLING_ALWAYS_TRUE);
$(x);
`````

## Normalized


`````js filename=intro
const x = $(true);
$(x);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(true);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
