# Preval test case

# null.md

> normalize > unary > minus > null
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-null);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -0;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(-0);
`````

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
