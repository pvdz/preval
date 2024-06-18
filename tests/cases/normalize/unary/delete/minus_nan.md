# Preval test case

# minus_nan.md

> Normalize > Unary > Delete > Minus nan
>
> Silly case that we hopefully never see but :shrug:

## Input

`````js filename=intro
$(delete -NaN);
`````

## Pre Normal


`````js filename=intro
$(delete -NaN);
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
