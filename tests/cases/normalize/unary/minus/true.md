# Preval test case

# true.md

> Normalize > Unary > Minus > True
>
> Negative literals should be statically resolved where possible

## Input

`````js filename=intro
$(-true);
`````

## Pre Normal


`````js filename=intro
$(-true);
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
