# Preval test case

# infinity.md

> Normalize > Unary > Tilde > Infinity
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~Infinity);
`````

## Pre Normal


`````js filename=intro
$(~Infinity);
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
