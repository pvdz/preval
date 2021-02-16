# Preval test case

# minus_undefined.md

> normalize > unary > minus > minus_undefined
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-(-undefined));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = NaN;
const tmpCalleeParam = -tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(NaN);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
