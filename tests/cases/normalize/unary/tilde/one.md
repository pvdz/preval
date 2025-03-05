# Preval test case

# one.md

> Normalize > Unary > Tilde > One
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~1);
`````

## Pre Normal


`````js filename=intro
$(~1);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = -2;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(-2);
`````

## PST Output

With rename=true

`````js filename=intro
$( -2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
