# Preval test case

# minus_undefined.md

> Normalize > Unary > Inv > Minus undefined
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!-undefined);
`````

## Pre Normal

`````js filename=intro
$(!-undefined);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = NaN;
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(true);
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
