# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+(-1));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = +-1;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -1;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
