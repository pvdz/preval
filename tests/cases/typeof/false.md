# Preval test case

# min_false.md

> plusmin > min_false
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof false)
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = typeof false;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = typeof false;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'boolean'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
