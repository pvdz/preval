# Preval test case

# string_num_dec.md

> Normalize > Unary > Tilde > String num dec
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~"1005");
`````

## Pre Normal


`````js filename=intro
$(~`1005`);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = -1006;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(-1006);
`````

## PST Output

With rename=true

`````js filename=intro
$( -1006 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1006
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
