# Preval test case

# false.md

> Normalize > Unary > Minus > False
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

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
