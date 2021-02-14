# Preval test case

# minus_null.md

> normalize > unary > minus > minus_null
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~(-null));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = -0;
const tmpCalleeParam = ~tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ~-0;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
