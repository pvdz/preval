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

## Output


`````js filename=intro
const x = { [true]: `haha` };
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { true[ "haha" ]: "haha" };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { true: '"haha"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
