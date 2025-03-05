# Preval test case

# inveq.md

> Normalize > Binary > Inveq
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 != 3);
`````

## Pre Normal


`````js filename=intro
$(5 != 3);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = true;
$(tmpCalleeParam);
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
