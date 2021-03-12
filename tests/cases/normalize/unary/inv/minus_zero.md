# Preval test case

# minus_zero.md

> Normalize > Unary > Inv > Minus zero
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!-0);
`````

## Pre Normal

`````js filename=intro
$(!-0);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = !-0;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = !-0;
$(tmpCalleeParam);
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
