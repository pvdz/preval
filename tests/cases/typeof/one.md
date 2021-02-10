# Preval test case

# min_one.md

> plusmin > min_one
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof 1);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = typeof 1;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'number'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
