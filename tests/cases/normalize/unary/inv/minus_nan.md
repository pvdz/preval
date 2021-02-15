# Preval test case

# minus_nan.md

> normalize > unary > inv > minus_nan
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!-NaN);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = !-NaN;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = !-NaN;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same