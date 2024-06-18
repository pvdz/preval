# Preval test case

# null.md

> Constants > Null
>
> A constant set to null should be eliminated

## Input

`````js filename=intro
const x = null;
$(x);
`````

## Pre Normal


`````js filename=intro
const x = null;
$(x);
`````

## Normalized


`````js filename=intro
const x = null;
$(x);
`````

## Output


`````js filename=intro
$(null);
`````

## PST Output

With rename=true

`````js filename=intro
$( null );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
