# Preval test case

# percent.md

> Normalize > Binary > Percent
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 % 3);
`````

## Pre Normal


`````js filename=intro
$(5 % 3);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = 2;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
