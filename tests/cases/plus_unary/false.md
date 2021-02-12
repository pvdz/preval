# Preval test case

# plus_false.md

> plusmin > plus_false
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+false);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = +false;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = +false;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
