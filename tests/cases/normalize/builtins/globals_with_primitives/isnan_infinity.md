# Preval test case

# isnan_infinity.md

> Normalize > Builtins > Globals with primitives > Isnan infinity
>
> Calling isNaN on a value that is a NaN should invariantly return true

## Input

`````js filename=intro
$(isNaN(Infinity));
`````

## Pre Normal


`````js filename=intro
$(isNaN(Infinity));
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
