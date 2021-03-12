# Preval test case

# minus_null.md

> Normalize > Unary > Minus > Minus null
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-(-null));
`````

## Pre Normal

`````js filename=intro
$(-(-null));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = -0;
const tmpCalleeParam = -tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(0);
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
