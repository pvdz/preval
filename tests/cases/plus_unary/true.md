# Preval test case

# plus_true.md

> plusmin > plus_true
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+true);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = +true;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = +true;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
