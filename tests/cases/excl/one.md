# Preval test case

# min_one.md

> plusmin > min_one
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!1);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = !1;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = !1;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
