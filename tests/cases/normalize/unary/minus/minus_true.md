# Preval test case

# minus_true.md

> normalize > unary > minus > minus_true
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-(-true));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = -1;
const tmpCalleeParam = -tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = -(-1);
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
