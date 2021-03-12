# Preval test case

# regex.md

> Tilde > Regex
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~/1/);
`````

## Pre Normal

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
const tmpUnaryArg = /1/;
const tmpCalleeParam = ~tmpUnaryArg;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
