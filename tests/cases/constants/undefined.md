# Preval test case

# undefined.md

> Constants > Undefined
>
> A constant set to undefined should be eliminated

#TODO

## Input

`````js filename=intro
const x = undefined;
$(x);
`````

## Pre Normal


`````js filename=intro
const x = undefined;
$(x);
`````

## Normalized


`````js filename=intro
const x = undefined;
$(x);
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
