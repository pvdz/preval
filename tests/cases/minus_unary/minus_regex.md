# Preval test case

# minus_regex.md

> Minus unary > Minus regex
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-(-/1/));
`````

## Pre Normal

`````js filename=intro
$(-(-/1/));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg$1 = /1/;
const tmpUnaryArg = -tmpUnaryArg$1;
const tmpCalleeParam = -tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpUnaryArg$1 = /1/;
const tmpUnaryArg = -tmpUnaryArg$1;
const tmpCalleeParam = -tmpUnaryArg;
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
