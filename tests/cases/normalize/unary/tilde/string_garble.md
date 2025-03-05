# Preval test case

# string_garble.md

> Normalize > Unary > Tilde > String garble
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~"garble");
`````

## Pre Normal


`````js filename=intro
$(~`garble`);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = -1;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(-1);
`````

## PST Output

With rename=true

`````js filename=intro
$( -1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
