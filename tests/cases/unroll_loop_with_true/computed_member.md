# Preval test case

# computed_member.md

> Unroll loop with true > Computed member
>
> 

#TODO

## Input

`````js filename=intro
$(String[$LOOP_DONE_UNROLLING_ALWAYS_TRUE]);
`````

## Pre Normal


`````js filename=intro
$(String[$LOOP_DONE_UNROLLING_ALWAYS_TRUE]);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = String.true;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = String.true;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = String.true;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
