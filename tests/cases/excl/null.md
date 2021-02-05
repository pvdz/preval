# Preval test case

# min_null.md

> plusmin > min_null
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!null);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = null;
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
tmpCallCallee(true);
`````

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
