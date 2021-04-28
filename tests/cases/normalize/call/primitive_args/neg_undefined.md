# Preval test case

# neg_undefined.md

> Normalize > Call > Primitive args > Neg undefined
>
> Primitive args that may need to be simplified

#TODO

## Input

`````js filename=intro
$(-undefined);
`````

## Pre Normal

`````js filename=intro
$(-undefined);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = NaN;
tmpCallCallee(tmpCalleeParam);
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