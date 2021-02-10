# Preval test case

# plus_undefined.md

> plusmin > plus_undefined
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+undefined);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = +undefined;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
