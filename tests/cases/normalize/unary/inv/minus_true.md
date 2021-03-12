# Preval test case

# minus_true.md

> Normalize > Unary > Inv > Minus true
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!-true);
`````

## Pre Normal

`````js filename=intro
$(!-true);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = -1;
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = !-1;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
