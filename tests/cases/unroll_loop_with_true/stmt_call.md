# Preval test case

# stmt_call.md

> Unroll loop with true > Stmt call
>
> 

#TODO

## Input

`````js filename=intro
$($LOOP_DONE_UNROLLING_ALWAYS_TRUE);
`````

## Pre Normal


`````js filename=intro
$($LOOP_DONE_UNROLLING_ALWAYS_TRUE);
`````

## Normalized


`````js filename=intro
$(true);
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
