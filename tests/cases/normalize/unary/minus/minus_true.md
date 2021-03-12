# Preval test case

# minus_true.md

> Normalize > Unary > Minus > Minus true
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-(-true));
`````

## Pre Normal

`````js filename=intro
$(-(-true));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = -1;
const tmpCalleeParam = -tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
