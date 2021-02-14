# Preval test case

# false.md

> normalize > unary > minus > false
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-false);
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
