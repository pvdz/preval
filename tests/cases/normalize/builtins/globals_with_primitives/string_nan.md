# Preval test case

# string_nan.md

> Normalize > Builtins > Globals with primitives > String nan
>
> Calling String on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(String(NaN));
`````

## Pre Normal

`````js filename=intro
$(String(NaN));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `NaN`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`NaN`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "NaN" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'NaN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
