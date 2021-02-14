# Preval test case

# zero.md

> normalize > unary > minus > zero
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~0);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -1;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(-1);
`````

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
