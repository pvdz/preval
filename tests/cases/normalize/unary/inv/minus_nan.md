# Preval test case

# minus_nan.md

> Normalize > Unary > Inv > Minus nan
>
> Inverting literals should be statically resolved

## Input

`````js filename=intro
$(!-NaN);
`````

## Pre Normal


`````js filename=intro
$(!-NaN);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = true;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
