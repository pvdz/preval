# Preval test case

# minus_true.md

> Normalize > Unary > Tilde > Minus true
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~(-true));
`````

## Pre Normal

`````js filename=intro
$(~-true);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = -1;
const tmpCalleeParam = ~tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ~-1;
$(tmpCalleeParam);
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
