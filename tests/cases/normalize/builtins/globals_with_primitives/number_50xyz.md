# Preval test case

# number_50xyz.md

> Normalize > Builtins > Globals with primitives > Number 50xyz
>
> Calling Number on a primitive should resolve

This is different from `parseInt`...

#TODO

## Input

`````js filename=intro
$(Number("50xyz"));
`````

## Pre Normal

`````js filename=intro
$(Number(`50xyz`));
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
