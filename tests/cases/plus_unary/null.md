# Preval test case

# plus_null.md

> plusmin > plus_null
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+null);
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

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
