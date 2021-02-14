# Preval test case

# minus_false.md

> normalize > unary > minus > minus_false
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-(-false));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = -0;
const tmpCalleeParam = -tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = -(-0);
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
