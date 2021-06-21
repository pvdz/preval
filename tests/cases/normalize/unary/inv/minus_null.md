# Preval test case

# minus_null.md

> Normalize > Unary > Inv > Minus null
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!-null);
`````

## Pre Normal

`````js filename=intro
$(!-null);
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

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
