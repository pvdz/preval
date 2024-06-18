# Preval test case

# pos_infinity.md

> Normalize > Call > Primitive args > Pos infinity
>
> Primitive args that may need to be simplified

## Input

`````js filename=intro
$(+Infinity);
`````

## Pre Normal


`````js filename=intro
$(+Infinity);
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
