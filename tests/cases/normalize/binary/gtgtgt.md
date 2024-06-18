# Preval test case

# gtgtgt.md

> Normalize > Binary > Gtgtgt
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 >>> 3);
`````

## Pre Normal


`````js filename=intro
$(5 >>> 3);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 0;
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
