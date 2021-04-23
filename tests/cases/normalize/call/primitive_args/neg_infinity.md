# Preval test case

# neg_infinity.md

> Normalize > Call > Primitive args > Neg infinity
>
> Primitive args that may need to be simplified

#TODO

## Input

`````js filename=intro
$(-Infinity);
`````

## Pre Normal

`````js filename=intro
$(-Infinity);
`````

## Normalized

`````js filename=intro
$(-Infinity);
`````

## Output

`````js filename=intro
$(-Infinity);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
