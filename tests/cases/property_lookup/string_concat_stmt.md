# Preval test case

# string_concat_stmt.md

> Property lookup > String concat stmt

## Input

`````js filename=intro
$StringPrototype.lastIndexOf; // dropme
$( "3.48" );
`````

## Pre Normal


`````js filename=intro
$StringPrototype.lastIndexOf;
$(`3.48`);
`````

## Normalized


`````js filename=intro
$(`3.48`);
`````

## Output


`````js filename=intro
$(`3.48`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "3.48" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '3.48'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
