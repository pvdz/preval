# Preval test case

# number_infinity.md

> Normalize > Builtins > Globals with primitives > Number infinity
>
> Calling Number on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(Number(Infinity));
`````

## Pre Normal


`````js filename=intro
$(Number(Infinity));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = Infinity;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(Infinity);
`````

## PST Output

With rename=true

`````js filename=intro
$( Infinity );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
