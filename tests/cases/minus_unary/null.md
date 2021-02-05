# Preval test case

# min_null.md

> plusmin > min_null
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-null);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = null;
const tmpCalleeParam = -tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -0;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
