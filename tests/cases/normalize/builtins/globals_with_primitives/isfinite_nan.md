# Preval test case

# isfinite_nan.md

> Normalize > Builtins > Globals with primitives > Isfinite nan
>
> Calling isFinite on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(isFinite(NaN));
`````

## Pre Normal

`````js filename=intro
$(isFinite(NaN));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = false;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
$( false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
