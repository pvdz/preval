# Preval test case

# infinity.md

> Normalize > Unary > Minus > Infinity
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-Infinity);
`````

## Normalized

`````js filename=intro
$(-Infinity);
`````

## Output

`````js filename=intro
$(-Infinity);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -Infinity
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
