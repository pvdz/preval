# Preval test case

# minus_null.md

> Normalize > Unary > Tilde > Minus null
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~(-null));
`````

## Pre Normal

`````js filename=intro
$(~-null);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -1;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(-1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
