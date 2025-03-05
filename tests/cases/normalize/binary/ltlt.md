# Preval test case

# ltlt.md

> Normalize > Binary > Ltlt
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 << 3);
`````

## Pre Normal


`````js filename=intro
$(5 << 3);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = 40;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(40);
`````

## PST Output

With rename=true

`````js filename=intro
$( 40 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 40
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
