# Preval test case

# string_num_neg_one.md

> Normalize > Unary > Tilde > String num neg one
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~"-1");
`````

## Pre Normal

`````js filename=intro
$(~`-1`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 0;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
