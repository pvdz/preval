# Preval test case

# string_num_zero.md

> Normalize > Unary > Tilde > String num zero
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~"0");
`````

## Pre Normal

`````js filename=intro
$(~`0`);
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
