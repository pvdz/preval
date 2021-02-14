# Preval test case

# minus_nan.md

> normalize > unary > minus > minus_nan
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~(-NaN));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ~-NaN;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ~-NaN;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
