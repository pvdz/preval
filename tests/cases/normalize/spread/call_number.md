# Preval test case

# call_number.md

> Normalize > Spread > Call number
>
> Spreading a number is an error

## Input

`````js filename=intro
$(...100);
`````

## Pre Normal


`````js filename=intro
$(...100);
`````

## Normalized


`````js filename=intro
$(...100);
`````

## Output


`````js filename=intro
$(...100);
`````

## PST Output

With rename=true

`````js filename=intro
$( ...100 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
