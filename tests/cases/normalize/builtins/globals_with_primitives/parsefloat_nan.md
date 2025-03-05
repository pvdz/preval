# Preval test case

# parsefloat_nan.md

> Normalize > Builtins > Globals with primitives > Parsefloat nan
>
> Calling parseFloat on a primitive should resolve

## Input

`````js filename=intro
$(parseFloat(NaN));
`````

## Pre Normal


`````js filename=intro
$(parseFloat(NaN));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = NaN;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(NaN);
`````

## PST Output

With rename=true

`````js filename=intro
$( NaN );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
