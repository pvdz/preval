# Preval test case

# minus_infinity.md

> Normalize > Unary > Inv > Minus infinity
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!-Infinity);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = !-Infinity;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = !-Infinity;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
