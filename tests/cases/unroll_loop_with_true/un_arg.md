# Preval test case

# un_arg.md

> Unroll loop with true > Un arg
>
> 

#TODO

## Input

`````js filename=intro
const x = typeof $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
$(x);
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

## Output


`````js filename=intro
$(`boolean`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "boolean" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
