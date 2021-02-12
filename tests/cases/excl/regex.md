# Preval test case

# min_regex.md

> plusmin > min_regex
>
> Literals with a `!` unary should get inlined

## Input

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
const tmpUnaryArg = /1/;
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
