# Preval test case

# minus_nan.md

> Normalize > Unary > Minus > Minus nan
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-(-NaN));
`````

## Pre Normal

`````js filename=intro
$(-(-NaN));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -(-NaN);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = -(-NaN);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
