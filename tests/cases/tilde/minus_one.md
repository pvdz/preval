# Preval test case

# minus_one.md

> Tilde > Minus one
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~(-1));
`````

## Pre Normal

`````js filename=intro
$(~-1);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 0;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
