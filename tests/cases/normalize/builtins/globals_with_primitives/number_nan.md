# Preval test case

# number_nan.md

> Normalize > Builtins > Globals with primitives > Number nan
>
> Calling Number on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(Number(NaN));
`````

## Pre Normal


`````js filename=intro
$(Number(NaN));
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
