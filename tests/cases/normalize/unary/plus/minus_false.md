# Preval test case

# minus_false.md

> Normalize > Unary > Plus > Minus false
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(+(-false));
`````

## Pre Normal


`````js filename=intro
$(+-false);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -0;
tmpCallCallee(tmpCalleeParam);
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
