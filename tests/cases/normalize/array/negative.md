# Preval test case

# call.md

> normalize > new > call
>
> Make sure negative numbers are considered a literal too

The AST node for negative numbers is a unary expression so it requires an explicit check for negative numbers.

## Input

`````js filename=intro
$([-100]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [-100];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: [-100]
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
