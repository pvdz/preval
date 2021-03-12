# Preval test case

# minus_one.md

> Normalize > Unary > Inv > Minus one
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!-1);
`````

## Pre Normal

`````js filename=intro
$(!-1);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = !-1;
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
