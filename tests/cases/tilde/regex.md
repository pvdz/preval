# Preval test case

# min_regex.md

> plusmin > min_regex
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~/1/);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = /1/;
const tmpCalleeParam = ~tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
