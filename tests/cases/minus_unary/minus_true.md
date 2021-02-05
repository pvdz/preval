# Preval test case

# min_true.md

> plusmin > min_true
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-(-true));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = -true;
const tmpCalleeParam = -tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = -1;
const tmpCalleeParam = -tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
