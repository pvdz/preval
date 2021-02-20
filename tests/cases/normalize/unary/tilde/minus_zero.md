# Preval test case

# minus_zero.md

> Normalize > Unary > Tilde > Minus zero
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~(-0));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ~-0;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ~-0;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
