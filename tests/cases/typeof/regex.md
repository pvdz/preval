# Preval test case

# min_regex.md

> plusmin > min_regex
>
> Inlining `typeof` when we know something is a literal

Regular expressions are objects. They do not have a special type, only special syntax.

## Input

`````js filename=intro
$(typeof /1/);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = /1/;
const tmpCalleeParam = typeof tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = /1/;
const tmpCalleeParam = typeof tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
