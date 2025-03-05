# Preval test case

# isnan_50xyz.md

> Normalize > Builtins > Globals with primitives > Isnan 50xyz
>
> Calling isNaN on a value that is a NaN should invariantly return true

This is different from `parseInt`...

## Input

`````js filename=intro
$(isNaN("50xyz"));
`````

## Pre Normal


`````js filename=intro
$(isNaN(`50xyz`));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = true;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
