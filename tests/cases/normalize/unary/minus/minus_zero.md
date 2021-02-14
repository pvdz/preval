# Preval test case

# minus_zero.md

> normalize > unary > minus > minus_zero
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-(-0));
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

Normalized calls: Same

Final output calls: Same
