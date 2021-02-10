# Preval test case

# min_undefined.md

> plusmin > min_undefined
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof undefined);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = typeof undefined;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'undefined'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
