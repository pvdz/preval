# Preval test case

# neg_nan.md

> Normalize > Call > Primitive args > Neg nan
>
> Primitive args that may need to be simplified

#TODO

## Input

`````js filename=intro
$(-NaN);
`````

## Pre Normal

`````js filename=intro
$(-NaN);
`````

## Normalized

`````js filename=intro
$(NaN);
`````

## Output

`````js filename=intro
$(NaN);
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