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
const tmpCallCallee = $;
const tmpCalleeParam = -2;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: -2
 - eval returned: undefined
