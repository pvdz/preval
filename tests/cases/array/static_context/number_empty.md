# Preval test case

# number_empty.md

> Array > Static context > Number empty
>
> Calling Number on arrays trigger spies

## Input

`````js filename=intro
$(Number([]));
`````

## Pre Normal


`````js filename=intro
$(Number([]));
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = [];
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(0);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
