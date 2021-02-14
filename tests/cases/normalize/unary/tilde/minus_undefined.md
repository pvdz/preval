# Preval test case

# minus_undefined.md

> normalize > unary > minus > minus_undefined
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~(-undefined));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = NaN;
const tmpCalleeParam = ~tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ~NaN;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
