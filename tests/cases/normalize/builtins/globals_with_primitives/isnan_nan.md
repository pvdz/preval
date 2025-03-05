# Preval test case

# isnan_nan.md

> Normalize > Builtins > Globals with primitives > Isnan nan
>
> Calling isNaN on a value that is a NaN should invariantly return true

## Input

`````js filename=intro
$(parseInt(NaN));
`````

## Pre Normal


`````js filename=intro
$(parseInt(NaN));
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
