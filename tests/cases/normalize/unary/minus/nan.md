# Preval test case

# nan.md

> normalize > unary > minus > nan
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-NaN);
`````

## Normalized

`````js filename=intro
$(-NaN);
`````

## Output

`````js filename=intro
$(-NaN);
`````

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
