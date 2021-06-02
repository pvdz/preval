# Preval test case

# regex.md

> Excl > Regex
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!/1/);
`````

## Pre Normal

`````js filename=intro
$(!/1/);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = /1/;
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(false);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
