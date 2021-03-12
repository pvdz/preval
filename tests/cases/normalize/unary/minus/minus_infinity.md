# Preval test case

# minus_infinity.md

> Normalize > Unary > Minus > Minus infinity
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-(-Infinity));
`````

## Pre Normal

`````js filename=intro
$(-(-Infinity));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -(-Infinity);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = -(-Infinity);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
