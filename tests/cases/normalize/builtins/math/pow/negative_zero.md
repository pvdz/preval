# Preval test case

# negative_zero.md

> Normalize > Builtins > Math > Pow > Negative zero
>
> Static expressions can be inlined under certain conditions

This ought to return -0.

## Input

`````js filename=intro
$(Math.pow(-0, 1));
`````

## Pre Normal


`````js filename=intro
$(Math.pow(-0, 1));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = -0;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(-0);
`````

## PST Output

With rename=true

`````js filename=intro
$( -0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
