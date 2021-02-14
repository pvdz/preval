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
const tmpCalleeParam = 1;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
