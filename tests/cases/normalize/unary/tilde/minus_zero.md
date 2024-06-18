# Preval test case

# minus_zero.md

> Normalize > Unary > Tilde > Minus zero
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~(-0));
`````

## Pre Normal


`````js filename=intro
$(~-0);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -1;
tmpCallCallee(tmpCalleeParam);
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
