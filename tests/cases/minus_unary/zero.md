# Preval test case

# zero.md

> Minus unary > Zero
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

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
