# Preval test case

# isfinite_50xyz.md

> Normalize > Builtins > Globals with primitives > Isfinite 50xyz
>
> Calling isFinite on a primitive should resolve

This is different from `parseInt`...

#TODO

## Input

`````js filename=intro
$(isFinite("50xyz"));
`````

## Pre Normal

`````js filename=intro
$(isFinite(`50xyz`));
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
