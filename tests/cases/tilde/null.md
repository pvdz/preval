# Preval test case

# min_null.md

> plusmin > min_null
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~null);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = null;
const tmpCalleeParam = ~tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = null;
const tmpCalleeParam = ~tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
