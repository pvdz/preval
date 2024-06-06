# Preval test case

# isfinite_500.md

> Normalize > Builtins > Globals with primitives > Isfinite 500
>
> Calling isFinite on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(isFinite(500));
`````

## Pre Normal


`````js filename=intro
$(isFinite(500));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = true;
tmpCallCallee(tmpCalleeParam);
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
