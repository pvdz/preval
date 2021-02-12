# Preval test case

# min_true.md

> plusmin > min_true
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~true);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ~true;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ~true;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: -2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
