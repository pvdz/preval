# Preval test case

# string_array_access_empty.md

> Normalize > Static expressions > Statement > String array access empty
>
> The length property on a string literal can be determined at compile time

## Input

`````js filename=intro
$(""[0]);
`````

## Pre Normal


`````js filename=intro
$(``[0]);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = undefined;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
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
