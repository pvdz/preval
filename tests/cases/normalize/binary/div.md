# Preval test case

# div.md

> Normalize > Binary > Div
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 / 3);
`````

## Pre Normal


`````js filename=intro
$(5 / 3);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 1.6666666666666667;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1.6666666666666667);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1.6666666666666667 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1.6666666666666667
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
