# Preval test case

# zero.md

> normalize > unary > minus > zero
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-0);
`````

## Normalized

`````js filename=intro
$(-0);
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
