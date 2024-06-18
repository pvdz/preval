# Preval test case

# number_number_0.md

> Array > Static context > Number number 0
>
> Calling Number on arrays trigger spies

## Input

`````js filename=intro
$(Number([0]));
`````

## Pre Normal


`````js filename=intro
$(Number([0]));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpStringFirstArg = [0];
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
tmpCallCallee(tmpCalleeParam);
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
